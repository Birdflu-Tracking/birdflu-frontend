import Image from "next/image";

import Button from "@/ui/Button/Button";

import Logo from "@assets/logo/logo.svg";
import Graphic from "@assets/Images/Topographic.svg";
import Graphic1 from "@assets/Images/kombdi.svg";
import { useEffect, useState } from "react";
import Map from "@/ui/Map/Map";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const SignUp = () => {
  const [toggle, settoggle] = useState(false);
  const [data, setData] = useState({
    user_type: "farmer",
    full_name: undefined,
    email: undefined,
    phone_number: undefined,
    outlet_name: undefined,
    outlet_address: undefined,
  });
  const [errors, setErrors] = useState<string>("");
  const [validated, setValidated] = useState(false);
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
      data.outlet_address &&
      data.outlet_name &&
      data.phone_number
    ) {
      axios
        .post(`http://localhost:8080/api/auth/create/${data.user_type}`, {
          firstName: data.full_name,
          lastName: data.full_name,
          email: data.email,
          phoneNumber: data.phone_number,
          outletAddress: data.outlet_address,
          outletName: data.outlet_name,
          latitude: 1212,
          longitude: 1212,
        })
        .then((d) => {
          console.log(d);
          router.push("/dashboard");
        })
        .catch((err) => {
          setErrors("User already Exist please login");
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
              className="rounded-md p-3 border border-black/10 focus:outline-none font-light"
              placeholder="mapusa"
              onClick={() => settoggle(true)}
              onChange={(e) => {
                //@ts-ignore
                setData((data) => ({
                  ...data,
                  outlet_address: e.target.value,
                }));
              }}
              required
            />
          </div>
          <Button value="Sign Up" onClick={() => handleSignup()} rounded="lg" />
        </form>
        <p className="text-center">
          Already have an account ?
          <Link href="/auth/signin" className="text-primary font-semibold ml-2  ">
            Sign In
          </Link>
        </p>
      </div>
      <div className="absolute left-8 top-8 h-18 w-44">
        <Image src={Logo} alt="" />
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
            <div className="flex-1 overflow-hidden rounded-md">
              <Map />{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
