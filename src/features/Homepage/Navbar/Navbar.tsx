import Image from "next/image";
import Button from "@/ui/Button/Button";
import Logo from "@assets/logo/logo.svg";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="h-fit w-full bg-secondary flex justify-between items-center p-5 py-6">
        <div className="h-full w-36">
          <Image src={Logo} />
        </div>
      <div className="relative w-1/4 h-12 bg-primary/20 rounded-full flex justify-evenly items-center text-[#626262]">
        <div className="relative ">
          <Link href="/">Home</Link>
          <div className="absolute -bottom-[2px] h-[2px] bg-primary w-full"></div>
        </div>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/reporting">Report Flu</Link>
      </div>
      <div className="">
        <Link href={"/auth/signin"}>
          <Button value="Sign In" rounded="rounded-xl" onClick={() => {}} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
