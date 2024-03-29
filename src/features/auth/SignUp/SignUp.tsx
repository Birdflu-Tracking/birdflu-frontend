import Image from "next/image";

import Button from "@/ui/Button/Button";

import Logo from "@assets/logo/logo.svg";
import Graphic from "@assets/Images/Topographic.svg";
import Graphic1 from "@assets/Images/kombdi.svg";
import { useEffect, useRef, useState } from "react";
import Map from "@/ui/Map/Map";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import mapboxgl from "mapbox-gl";

const SignUp = () => {
  const [toggle, settoggle] = useState(false);
  const [mapBox, setMapBox] = useState<any | undefined>(undefined);
  const addRef = useRef(null);
  const [data, setData] = useState({
    user_type: "farmer",
    full_name: undefined,
    email: undefined,
    password: undefined,
    phone_number: undefined,
    outlet_name: undefined,
    outlet_address: undefined,
    latitude: undefined,
    longitude: undefined,
  });
  const [errors, setErrors] = useState<string>("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let marker: any = undefined;
    if (mapBox) {
      mapBox.on("click", (event: any) => {
        let cordinates = event.lngLat;
        setData((prev) => ({
          ...prev,
          latitude: cordinates.lat,
          longitude: cordinates.lng,
        }));
        console.log(cordinates);
        if (marker) {
          marker.remove();
        }
        marker = new mapboxgl.Marker().setLngLat(cordinates).addTo(mapBox);
      });
    }
  }, [mapBox]);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      setErrors("");
    }, 5000);
  }, [errors]);
  function handleSignup() {
    let ph = /^[7-9][0-9]{9}$/;
    let email = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    setValidated(true);
    // @ts-ignore
    if (data.phone_number && !ph.test(data.phone_number)) {
      setErrors("Enter Valid Phone Number");
      setValidated(false);
    }
    // @ts-ignore
    if (data.email && !email.test(data.email)) {
      setErrors("Enter Valid Email");
      setValidated(false);
    }
    if (
      validated &&
      data.user_type &&
      data.full_name &&
      data.email &&
      data.password &&
      data.outlet_address &&
      data.outlet_name &&
      data.phone_number &&
      data.latitude &&
      data.longitude
    ) {
      setLoading(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/create/${data.user_type}`, {
          fullName: data.full_name,
          email: data.email,
          password: data.password,
          phoneNumber: data.phone_number,
          outletAddress: data.outlet_address,
          outletName: data.outlet_name,
          latitude: data.latitude,
          longitude: data.longitude,
        })
        .then((d) => {
          console.log(d);
          router.push("/auth/signin");
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);

          setLoading(false);
          if (err.response.data.code == "auth/email-already-exists") {
            setErrors("User already Exist please login");
          }
          if (err.code === "ERR_NETWORK") {
            setErrors("No internet");
          }
        });
    }
  }
  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="bg-secondary  rounded-lg border border-primary px-16 py-10 space-y-2 shadow-lg">
        <div className="">
          <h1 className="text-2xl font-normal mb-2">Get Started Now</h1>
          <p>Enter your credentials to access your account</p>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <p className="text-red-700 font-bold">{errors}</p>

          <div className="space-y-2">
            <h1>Register as </h1>
            <select
              name=""
              id=""
              className="w-full p-3 rounded-md border border-black/10 bg-[#FADEBE]/30 focus:outline-none text-primary font-semibold"
              onChange={(e) => {
                //@ts-ignore
                setData((data) => ({
                  ...data,
                  user_type: e.target.value,
                }));
              }}
              required
            >
              <option value="farmer" className="p-5">
                Farmer
              </option>
              <option value="distributor" className="p-5">
                Distributor
              </option>
              <option value="seller" className="p-5">
                Seller
              </option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Full name</label>
            <input
              type="text"
              className="rounded-md p-3 border border-black/10 focus:outline-none font-light"
              placeholder="Faruq shaikh"
              onChange={(e) => {
                //@ts-ignore
                setData((data) => ({
                  ...data,
                  full_name: e.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Email address</label>
            <input
              type="email"
              className="rounded-md p-3 border border-black/10 focus:outline-none font-light"
              placeholder="faruq12@company.com"
              onChange={(e) => {
                //@ts-ignore
                setData((data) => ({
                  ...data,
                  email: e.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="rounded-md p-3 border border-black/10 focus:outline-none font-light"
              onChange={(e) => {
                //@ts-ignore
                setData((data) => ({
                  ...data,
                  password: e.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Phone number</label>
            <input
              type="tel"
              className="rounded-md p-3 border border-black/10 focus:outline-none font-light"
              placeholder="+915845324456"
              onChange={(e) => {
                //@ts-ignore
                setData((data) => ({
                  ...data,
                  phone_number: e.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Outlet name</label>
            <input
              type="text"
              className="rounded-md p-3 border border-black/10 focus:outline-none font-light"
              placeholder="Santosh Farm"
              onChange={(e) => {
                //@ts-ignore
                setData((data) => ({
                  ...data,
                  outlet_name: e.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Outlet address</label>
            <input
              type="text"
              ref={addRef}
              className="rounded-md p-3 border border-black/10 focus:outline-none font-light"
              placeholder="mapusa"
              onClick={() => settoggle(true)}
              required
            />
          </div>
          <Button
            value={loading ? "Registering..." : "Sign Up"}
            onClick={() => handleSignup()}
            disabled={loading == true}
          />
        </form>
        <p className="text-center">
          Already have an account ?{" "}
          <Link
            href="/auth/signin"
            className="text-primary font-semibold ml-2  "
          >
            Sign In
          </Link>
        </p>
      </div>
      <div className="absolute left-8 top-8 h-18 w-44">
        <Link href={"/"}>
          <Image src={Logo} alt="" />
        </Link>
      </div>
      <div className="absolute -right-20 -top-28 h-80 w-80">
        <Image src={Graphic} alt="" />
      </div>
      <div className="absolute -bottom-20 -right-28 h-80 w-80 -rotate-45">
        <Image src={Graphic} alt="" />
      </div>
      <div className="absolute -bottom-36 -left-32 h-96 w-96 ">
        <Image src={Graphic1} alt="" />
      </div>
      {toggle && (
        <div className="absolute h-screen w-screen bg-gray-400/30 flex items-center justify-center">
          <div className="relative h-1/2 w-1/2 rounded-lg shadow-lg bg-white p-6 flex flex-col">
            <div className="flex justify-between pb-4">
              <p className="font-semibold">Select your location</p>{" "}
              <button onClick={() => settoggle(false)}>X</button>
            </div>
            <div className="flex-1 flex gap-5">
              <div className="flex-1  overflow-hidden rounded-xl">
                {" "}
                <Map setMapBox={(map) => setMapBox(map)} />{" "}
              </div>
              <div className="flex-1 gap-10 flex flex-col items-end w-full">
                <div className=" flex flex-col gap-2 w-full ">
                  <label htmlFor="" className="text-lg font-medium">
                    Outlet Address
                  </label>
                  <textarea
                    onChange={(e) => {
                      //@ts-ignore
                      setData((data) => ({
                        ...data,
                        outlet_address: e.target.value,
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
                    if (
                      data.latitude &&
                      data.longitude &&
                      data.outlet_address
                    ) {
                      //@ts-ignore
                      addRef.current.value = data.outlet_address;
                      settoggle(false);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
