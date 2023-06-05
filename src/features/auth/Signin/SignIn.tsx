import Image from "next/image";

import Button from "@/ui/Button/Button";

import Logo from "@assets/logo/logo.svg";
import Graphic from "@assets/Images/Topographic.svg";
import Graphic1 from "@assets/Images/kombdi.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseback.config";
import { cookies } from "next/headers";
import { useCookies } from "react-cookie";

const SignIn = () => {
  const [userType, setUserType] = useState<any>("farmer");
  const [email, setEmail] = useState<any>(undefined);
  const [password, setpassword] = useState<any>(undefined);
  const [errors, setErrors] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  async function handleSignin() {
    if (userType && email && password) {
      console.log(userType, email, password);
      setLoading(true);
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await user.getIdToken();
        console.log({ idToken });

        await axios
          .post(
            `${
              userType == "health-worker"
                ? "http://localhost:8080/api/auth/login/health-worker"
                : "http://localhost:8080/api/auth/login"
            }`,
            { idToken },
            { withCredentials: true }
          )
          .then((res) => {
            setCookie("user", res.data.user);
            setLoading(false);
            if (userType == "health-worker") {
              res.data.user.type = "health-worker";
              setCookie("user", res.data.user);
              router.push("/health-dashboard");
            } else {
              router.push("/dashboard");
            }
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
        setLoading(false);
        //@ts-ignore
        if (err.code == "auth/wrong-password") {
          setErrors("Invalid Password");
        }
        //@ts-ignore

        if (err.code == "auth/user-not-found") {
          setErrors("User not registered");
        }
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
              <option value="health-worker" className="p-5">
                Health Worker
              </option>
            </select>
          </div>
          <form
            action=""
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="rounded-md p-3 border border-black/10 focus:outline-none font-light"
                placeholder="farm@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="">password</label>
              <input
                type="password"
                className="rounded-md p-3 border border-black/10 focus:outline-none font-light"
                // placeholder="Enter the 6 digit password"
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>
            <Button
              value={loading ? "Signing in..." : "Sign In"}
              rounded="rounded-md"
              disabled={loading == true}
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
