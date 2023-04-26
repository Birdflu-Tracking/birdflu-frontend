import Image from "next/image";
import Link from "next/link";
import Logo from "@assets/logo/logo.svg";
import { Icon } from "@iconify/react";
import Button from "@/ui/Button/Button";
import ChickenIcon from "@assets/Images/chicken-icon.svg";
const Inventory = () => {
  let links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "material-symbols:space-dashboard-rounded",
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: "material-symbols:inventory-2",
    },
  ];
  return (
    <div className="flex w-screen h-screen bg-secondary ">
      {/* Sidebar */}
      <div className="w-1/6 p-7 flex flex-col justify-between ">
        <div className="space-y-10">
          <div className=" h-15 w-40">
            <Image src={Logo} alt="" />
          </div>
          <div className="flex flex-col space-y-2">
            <Link
              href={"/dashboard"}
              className=" p-3 text-textSecondary font-medium rounded-lg flex flex-row space-x-2 items-center"
            >
              <Icon
                icon="material-symbols:space-dashboard-rounded"
                height={20}
              />
              <p>Dashboard</p>
            </Link>
            <Link
              href={"/inventory"}
              className="bg-white p-3 text-primary font-medium rounded-lg flex flex-row space-x-2 items-center"
            >
              <Icon icon="material-symbols:inventory-2" /> <p>Inventory</p>
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-4 text-textSecondary font-medium">
          <Link
            href={"/inventory"}
            className=" text-textSecondary font-medium rounded-lg flex flex-row space-x-2 items-center"
          >
            <Icon icon="material-symbols:settings" height={20} />{" "}
            <p>Settings</p>
          </Link>
          <Link
            href={"/inventory"}
            className="  text-textSecondary font-medium rounded-lg flex flex-row space-x-2 items-center"
          >
            <Icon icon="ic:baseline-log-out" height={20} /> <p>Logout</p>
          </Link>
        </div>
      </div>
      {/* MainComponent */}
      <div className="  flex-1 p-7 flex space-x-7">
        <div className=" bg-white h-full w-[75%] rounded-xl p-5 space-y-4">
          <h1 className="text-primary text-3xl font-bold">Inventory</h1>
        </div>
        <div className="bg-white h-full rounded-xl w-[25%] p-5 space-y-4">
          <h1 className="text-primary text-xl font-bold">Market Summary</h1>
          <div className="bg-secondary rounded-xl p-4 flex justify-between">
            <div className="">
              <h5 className="text-textSecondary/75 font-semibold">
                Total Chickens
              </h5>
              <h5 className="text-4xl text-primary font-bold">100</h5>
            </div>
            <div className="self-end">
              <Image src={ChickenIcon} />
            </div>
          </div>{" "}
          <div className="bg-secondary rounded-xl p-4 flex justify-between">
            <div className="">
              <h5 className="text-textSecondary/75 font-semibold">
                Total Batches
              </h5>
              <h5 className="text-4xl text-primary font-bold">67</h5>
            </div>
            <Icon
              icon="material-symbols:supervised-user-circle"
              height={50}
              className="text-textSecondary/50 self-end"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
