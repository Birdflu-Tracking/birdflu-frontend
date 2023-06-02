import Navbar from "@/features/Homepage/Navbar/Navbar";
import Button from "@/ui/Button/Button";
import { FormInput } from "@/ui/FormInput/FormInput";
import { PrimaryButton } from "@/ui/PrimaryButton/PrimaryButton";
import axios from "axios";
import { error } from "console";
import React, { use, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
export type ReportingDataType = {
  fullName: string | undefined;
  address: string | undefined;
  contact: string | undefined;
  poultryShop:
    | {
        key: string;
        label: string;
      }
    | undefined;
  symtompsStartDate: string | undefined;
};
export default function Reporting() {
  const [loading, setLoading] = useState(false);
  const [sellers, setSellerShops] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState<{
    key: string;
    label: string;
  } | null>(null);
  const [data, setData] = useState<ReportingDataType>({
    fullName: undefined,
    address: undefined,
    contact: undefined,
    poultryShop: undefined,
    symtompsStartDate: undefined,
  });

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    console.log(data);
    if (
      data.fullName &&
      data.address &&
      data.contact &&
      data.poultryShop &&
      data.symtompsStartDate
    ) {
      console.log("sending");
      setLoading(true);
      axios
        .post("http://localhost:8080/open/submit-flu-report", {
          reporterName: data.fullName,
          phoneNumber: data.contact,
          poultryShopName: data.poultryShop.label,
          poultryShopDocId: data.poultryShop.key,
          symptomStartDate: data.symtompsStartDate,
          address: data.address,
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

  useEffect(() => {
    getSellerShops();
  }, []);

  useEffect(() => {
    console.log(
      `SELECTED_SELLER: ${selectedSeller ? selectedSeller.key : selectedSeller}`
    );
  }, [selectedSeller]);
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-16 px-16">
        <h1 className="text-3xl font-bold">Reporting Form</h1>
        <form className="flex">
          {/* Reporters user data */}
          <div>
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
              value="Submit"
              rounded="rounded-md"
              onClick={(e) => handleSubmit(e)}
              disabled={loading == true}
            />
          </div>

          {/* Attachments */}
          <div className="px-20 py-8 text-center w-max">
            <p className="text-xl mb-3">Upload your doctors letter</p>
            <div className="p-10 text-center border-dotted border-2 border-primary rounded-lg">
              <PrimaryButton label="Upload" className={"px-14 mb-1"} />
              <p>or Drag and drop files</p>
              <p>file format .jpeg, .png. max file size 1mb</p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
