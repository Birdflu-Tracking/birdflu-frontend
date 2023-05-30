import { Icon } from "@iconify/react";
import Link from "next/link";
import Logo from "@assets/logo/logo.svg";
import Image from "next/image";

const HealthSidebar = () => {
    let links = [
        {
          name: "Dashboard",
          path: "/health-worker",
          icon: "material-symbols:space-dashboard-rounded",
        },
        {
          name: "Reports",
          path: "/health-reports",
          icon: "material-symbols:inventory-2",
        },
      ];
  return (
    <div className="w-1/6 p-7 flex flex-col justify-between ">
      <div className="space-y-10">
        <div className=" h-15 w-40">
          <Link href={"/"}>
            <Image src={Logo} alt="" />
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          <Link
            href={"/health-dashboard"}
            className="bg-white p-3 text-primary font-medium rounded-lg flex flex-row space-x-2 items-center"
          >
            <Icon icon="material-symbols:space-dashboard-rounded" height={20} />{" "}
            <p>Dashboard</p>
          </Link>
          <Link
            href={"/health-reports"}
            className=" p-3 text-textSecondary font-medium rounded-lg flex flex-row space-x-2 items-center"
          >
            <Icon icon="material-symbols:inventory-2" height={20} />{" "}
            <p>Reports</p>
          </Link>
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

export default HealthSidebar;
