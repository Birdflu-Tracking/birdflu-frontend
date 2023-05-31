import Image from "next/image";
import Link from "next/link";
import Logo from "@assets/logo/logo.svg";
import { Icon } from "@iconify/react";
import Button from "@/ui/Button/Button";
import ChickenIcon from "@assets/Images/chicken-icon.svg";
import PieChart from "@/features/ui/PieChart/PieChart";
import Sidebar from "@/features/ui/Sidebar/Sidebar";
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
      <Sidebar links={links} />
      {/* MainComponent */}
      <div className="  flex-1 p-7 flex space-x-7">
        <div className=" bg-white h-full w-[75%] rounded-xl p-5 space-y-4">
          <h1 className="text-primary text-3xl font-bold">Inventory</h1>
          <div className="p-5 ">
            <table className="w-full ">
              <thead className="text-primary font-semibold text-xl">
                <tr>
                  <td>Date</td>
                  <td>Time</td>
                  <td>BatchID</td>
                  <td>Batch Size</td>
                  <td>Distributor</td>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                <tr className="border-b   ">
                  <td className="py-2">12 Mar 23</td>
                  <td>17:00</td>
                  <td>2404</td>
                  <td>10</td>
                  <td>Mangesh Tupe</td>
                </tr>
                <tr className="border-b   ">
                  <td className="py-2">12 Mar 23</td>
                  <td>17:00</td>
                  <td>2404</td>
                  <td>10</td>
                  <td>Mangesh Tupe</td>
                </tr>
                <tr className="border-b   ">
                  <td className="py-2">12 Mar 23</td>
                  <td>17:00</td>
                  <td>2404</td>
                  <td>10</td>
                  <td>Mangesh Tupe</td>
                </tr>{" "}
                <tr className="border-b   ">
                  <td className="py-2">12 Mar 23</td>
                  <td>17:00</td>
                  <td>2404</td>
                  <td>10</td>
                  <td>Mangesh Tupe</td>
                </tr>{" "}
                <tr className="border-b   ">
                  <td className="py-2">12 Mar 23</td>
                  <td>17:00</td>
                  <td>2404</td>
                  <td>10</td>
                  <td>Mangesh Tupe</td>
                </tr>{" "}
                <tr className="border-b   ">
                  <td className="py-2">12 Mar 23</td>
                  <td>17:00</td>
                  <td>2404</td>
                  <td>10</td>
                  <td>Mangesh Tupe</td>
                </tr>
              </tbody>
            </table>
          </div>
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
              <Image src={ChickenIcon} alt="test"/>
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
          <div className="">
            <div className="w-full h-60">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
