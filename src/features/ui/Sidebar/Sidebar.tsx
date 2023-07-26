import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@assets/logo/logo.svg";
import { useRouter } from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
type Prop = {
  links: { name: string; path: string; icon: string }[];
};
const Sidebar: React.FC<Prop> = ({ links }) => {
  const router = useRouter();
  const [cookies] = useCookies(["user"]);

  return (
    <div className="w-1/6 p-7 flex flex-col justify-between ">
      <div className="space-y-10">
        <div className=" h-15 w-40">
          <Link href={"/"}>
            <Image src={Logo} alt="" />
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          {links.map(({ name, path, icon }, index) => {
            return (
              <Link
                key={index}
                href={path}
                className={`${
                  path === router.pathname
                    ? "bg-white  text-primary"
                    : "text-textSecondary"
                } p-3 font-medium rounded-lg flex flex-row space-x-2 items-center`}
              >
                <Icon icon={icon} height={20} /> <p>{name}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col space-y-4 text-textSecondary font-medium">
        <Link
          href={"#"}
          className=" text-textSecondary font-medium rounded-lg flex flex-row space-x-2 items-center"
        >
          <Icon icon="material-symbols:settings" height={20} /> <p>Settings</p>
        </Link>
        <Link
          href={"/auth/signin"}
          className="  text-textSecondary font-medium rounded-lg flex flex-row space-x-2 items-center"
        >
          <Icon icon="ic:baseline-log-out" height={20} /> <p>Logout</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
