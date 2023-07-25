import Navbar from "@/features/Homepage/Navbar/Navbar";
import Button from "@/ui/Button/Button";
import { FormInput } from "@/ui/FormInput/FormInput";
import { PrimaryButton } from "@/ui/PrimaryButton/PrimaryButton";
import axios from "axios";
import { error } from "console";
import React, { use, useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import Map from "@/ui/Map/Map";

import { v4 as uuidv4 } from "uuid";
import mapboxgl from "mapbox-gl";
import { app } from "@/config/firebaseback.config";
export type ReportingDataType = {
  fullName: string | undefined;
  address: string | undefined;
  contact: string | undefined;
  cords: [number, number] | undefined;
  poultryShop:
    | {
        key: string;
        label: string;
      }
    | undefined;
  symtompsStartDate: string | undefined;
};
export default function Reporting() {
  const [toggle, settoggle] = useState(false);
  const addRef = useRef(null);
  const [popupError,setPopupError]=useState("")
  const [error,setError]=useState("")
  const [loading, setLoading] = useState(false);
  const [sellers, setSellerShops] = useState([]);
  const [mapBox, setMapBox] = useState<any | undefined>(undefined);
  const [letter, setLetter] = useState(undefined);
  const [selectedSeller, setSelectedSeller] = useState<{
    key: string;
    label: string;
  } | null>(null);
  const [data, setData] = useState<ReportingDataType>({
    fullName: undefined,
    address: undefined,
    cords: undefined,
    contact: undefined,
    poultryShop: undefined,
    symtompsStartDate: undefined,
  });
  useEffect(() => {
    let marker = undefined;
    if (mapBox) {
      mapBox.on("click", (event) => {
        let cordinates = event.lngLat;
        console.log(cordinates)
        setData((prev) => ({
          ...prev,
          cords:cordinates
        }));
        if (marker) {
          marker.remove();
        }
        marker = new mapboxgl.Marker().setLngLat(cordinates).addTo(mapBox);
      });
    }
  }, [mapBox]);
  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
  let validated=false;
  let ph = /^[7-9][0-9]{9}$/;
  //@ts-ignore
  if(data.contact&&!ph.test(data.contact)){
    setError("Invalid Phone number")
  }
if(!letter){
  setError("Add your doctors letter")
}
if(ph.test(data.contact)){
  validated=true
}
    // e.preventDefault();
    console.log(
      data.fullName,
      data.address,
      data.contact,
      data.poultryShop,
      data.symtompsStartDate,
      data.cords
    );
    if (
      data.fullName &&
      data.address &&
      data.contact &&
      data.poultryShop &&
      data.symtompsStartDate &&
      data.cords&&letter&& validated
    ) {
      console.log("sending");
      setLoading(true);
      const storage = getStorage(app);
      const storageRef = ref(storage, `${letter.name}`);
      await uploadBytesResumable(storageRef, letter);

      axios
        .post("http://localhost:8080/open/submit-flu-report", {
          reporterName: data.fullName,
          phoneNumber: data.contact,
          poultryShopName: data.poultryShop.label,
          poultryShopDocId: data.poultryShop.key,
          symptomStartDate: data.symtompsStartDate,
          address: data.address,
          cords: data.cords,
          doctorLetterUrl: await getDownloadURL(storageRef),
        })
        .then(() => {
          setLoading(false);
          console.log("success");
        })
        .catch(() => {
          setLoading(false);

          console.log("failed");
        });
    }
  }

  const getSellerShops = async () => {
    axios
      .get("http://localhost:8080/open/seller-shops")
      .then((res) => {
        console.log(res.data.sellers);
        setSellerShops(res.data.sellers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const imgAdded = (event: Event) => {
    if (event && event.target?.files[0].size > 100000000) {
      // toast.error("😢️ PDF size should be less than 100MB!", toastStyles.error);
      setLetter(event.target?.files[0]);
    } else {
      setLetter(event.target?.files[0]);
      // setPdf(event.target.files[0]);
      // setPdfPreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
  };
  useEffect(()=>{
    setTimeout(()=>{
      setError("")
    setPopupError("")
    },5000)
  },[error,popupError])

  useEffect(() => {
    getSellerShops();
  }, []);

  useEffect(() => {
    console.log(
      `SELECTED_SELLER: ${selectedSeller ? selectedSeller.key : selectedSeller}`
    );
  }, [selectedSeller]);
  return (
    <div className="relative h-screen w-full">
      <Navbar />
      <div className="relative container mx-auto py-16 px-16">
        <h1 className="text-3xl font-bold">Reporting Form</h1>
        <p className="text-red-600 font-bold mb-2">{error}</p>

        <div className="flex">
          {/* Reporters user data */}
          <form onSubmit={(e)=>e.preventDefault()}>
            {[
              {
                dataName: "fullName",
                label: "Full Name",
                placeholder: "Enter your full name",
                type: "text",
              },
              {
                dataName: "address",

                label: "Address",
                placeholder: "Enter your address",
                type: "text",
              },
              {
                dataName: "poultryShop",

                label: "Poultry shop",
                placeholder: "Search poultry shop",
                type: "search",
              },
              {
                dataName: "symtompsStartDate",
                label: "Symptoms starting date",
                placeholder: "",
                type: "date",
              },
              {
                dataName: "contact",

                label: "Phone Number",
                placeholder: "Enter your phone number",
                type: "tel",
              },
            ].map(
              (item: {
                dataName: string;
                label: string;
                placeholder: string;
                type: string;
              }) => {
                return (
                  <FormInput
                    required
                    onClick={() => {
                      if (item.dataName === "address") {
                        settoggle(true);
                      }
                    }}
                    value={item.dataName === "address" ? data.address : null}
                    label={item.label}
                    placeholder={item.placeholder}
                    setSellerOption={setSelectedSeller}
                    type={item.type}
                    key={uuidv4()}
                    searchOptions={sellers}
                    setData={setData}
                    //@ts-ignore
                    onChange={(e) => {
                      setData((prev) => {
                        //@ts-ignore
                        var newdata = prev;
                        console.log(prev);
                        //@ts-ignore
                        newdata[item.dataName] = e.target.value;

                        return newdata;
                      });
                    }}
                  />
                );
              }
            )}

            {/* Phone OTP */}
            {/* <div className="flex">
              <FormInput
                label="Verify Phone Number"
                placeholder="Enter OTP"
                setSellerOption={setSelectedSeller}
                setData={setData}
                type="text"
                searchOptions={sellers}
              />
              <PrimaryButton label="Send OTP" className={"ml-5 h-12 mt-auto"} />
            </div> */}
            <p className="mt-2 mb-2">
              Your data will be encrypted and stored on your server, we dont
              sell your use your data without your permissions.
            </p>
            <Button
            type="submit"
              value={loading ? "Submitting..." : "Submit"}
              onClick={(e) =>{ e.preventDefault(); handleSubmit(e)}}
              disabled={loading == true}
            />
          </form>

          {/* Attachments */}
          <div className="px-20 py-8 text-center w-max">
            <p className="text-xl mb-3">Upload your doctors letter</p>
            <div className="p-10 text-center border-dotted border-2 border-primary rounded-lg">
              {/* <PrimaryButton label="Upload" className={"px-14 mb-1"} /> */}
              <input
                type="file"
                name="upload"
                id="upload-pdf"
                hidden
                onChange={imgAdded}
                required
              />
              <p>
                <label
                  htmlFor="upload-pdf"
                  className={
                    "px-14 mb-1 bg-primary font-bold py-3 rounded-xl text-white w-max border-none cursor-pointer"
                  }
                >
                  Choose File
                </label>
              </p>
              {letter ? (
                <>
                  <p className="mt-4">{letter.name}</p>
                  <p>or Drag and drop files</p>
                  <p>file format .jpeg, .png. max file size 1mb</p>
                </>
              ) : (
                <>
                  <p className="mt-4">or Drag and drop files</p>
                  <p>file format .jpeg, .png. max file size 1mb</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
        <div className={`fixed top-0 h-screen w-screen bg-gray-400/30 flex items-center justify-center ${toggle?"visible":"invisible"}`}>
          <div className="relative h-1/2 w-1/2 rounded-lg shadow-lg bg-white p-6 flex flex-col">
            <div className="flex justify-between pb-4">
              <p className="font-semibold">Select your location</p>{" "}
              <button onClick={() => settoggle(false)}>X</button>
            </div>
            <p className="text-red-600 font-bold mb-2">{popupError}</p>
            <div className="flex-1 flex gap-5">
              <div className="flex-1  overflow-hidden rounded-xl">
                {" "}
                <Map setMapBox={(map) => setMapBox(map)} />{" "}
              </div>
              <div className="flex-1 gap-10 flex flex-col items-end w-full">
                <div className=" flex flex-col gap-2 w-full ">
                  <label htmlFor="" className="text-lg font-medium">
                    Address
                  </label>
                  <textarea
                    onChange={(e) => {
                      //@ts-ignore
                      setData((data) => ({
                        ...data,
                        address: e.target.value,
                      }));
                    }}
                    name=""
                    id=""
                    rows={5}
                    placeholder="your address"
                    className="rounded-md p-3 border border-black/10 focus:outline-none font-light w-full"
                  />
                </div>
                <Button
                  value="Next"
                  onClick={() => {
                    if (data.cords && data.address) {
                      settoggle(false);
                      setPopupError("")

                    }else{
                      setPopupError("Pin a location and add address")
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
}
