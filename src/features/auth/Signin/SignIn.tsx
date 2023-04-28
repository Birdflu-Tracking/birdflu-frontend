import Image from "next/image";

import Button from "@/ui/Button/Button";

import Logo from "@assets/logo/logo.svg";
import Graphic from "@assets/Images/Topographic.svg";
import Graphic1 from "@assets/Images/kombdi.svg";
import { useEffect, useState } from "react";
import Link from "next/link";

const SignIn = () => {
  const [userType, setUserType] = useState<any>("farmer");
  const [contact, setContact] = useState<any>(undefined);
  const [otp, setOtp] = useState<any>(undefined);
  const [errors, setErrors] = useState<string>("");
  function handleSignin() {
    let regex = /^[7-9][0-9]{9}$/;
    if (userType && contact && otp) {
      console.log(userType, contact, otp);
      if (regex.test(contact)) {
      } else {
        setErrors("Enter Valid Phone Number");
      }
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setErrors("");
    }, 3000);
  }, [errors]);
  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="bg-secondary  rounded-lg border border-primary px-16 py-10 space-y-2 shadow-lg">
        <div className="">
          <h1 className="text-2xl font-normal mb-2">Welcome back</h1>
          <p>Enter your credentials to access your account</p>
        </div>
        <div className="space-y-4">
          <p className="text-red-700 font-bold">{errors}</p>
          <div className="space-y-2">
            <h1>Sign In as </h1>
            <select
              name=""
              id=""
              className="w-full p-3 rounded-md border border-black/10 bg-[#FADEBE]/30 focus:outline-none text-primary font-semibold"
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="farmer" className="p-5">
                Farmer
              </option>
              <option value="distributor" className="p-5">
                Distributor
              </option>
            </select>
          </div>
          <form
            action=""
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor="">Phone number</label>
              <input
                type="tel"
                className="rounded-md p-3 border border-black/10 focus:outline-none font-light"
                placeholder="+91583452557"
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="">OTP</label>
              <input
                type="number"
                className="rounded-md p-3 border border-black/10 focus:outline-none font-light"
                placeholder="Enter the 6 digit OTP"
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={5}
              />
            </div>
            <Button
              value="Sign In"
              rounded="rounded-md"
              onClick={() => handleSignin()}
            />
          </form>
          <p className="text-center">
            dont have an account ?
            <Link
              href="/auth/signup"
              className="text-primary font-semibold ml-2"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <div className="absolute left-8 top-8 h-18 w-44">
        <Link href={"/"}>
          <Image src={Logo} alt="" />
        </Link>{" "}
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
    </div>
  );
};

export default SignIn;
