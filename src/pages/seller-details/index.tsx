import Image from "next/image";
import Link from "next/link";
import Logo from "@assets/logo/logo.svg";
import { Icon } from "@iconify/react";
import Button from "@/ui/Button/Button";
import BarChart from "@/features/ui/BarChart/BarChart";
import { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

//assets
import TapPay from "@assets/Images/tap-transfer.png";
import Map from "@/ui/Map/Map";
const Dashboard = () => {
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
  const [toggle, settoggle] = useState(false);
  const state = {
    options: [
      { name: "Depression", id: 1 },
      { name: "Combs, wattle, bluish face region", id: 2 },
      { name: "Swollen face region", id: 3 },
      { name: "Balance disorders", id: 4 },
      { name: "Narrowness of eyes", id: 5 },
    ],
  };

  return (
    <div className="flex w-screen h-screen bg-secondary ">
      {/* Sidebar */}
      <div className="w-1/6 p-7 flex flex-col justify-between ">
        <div className="space-y-10">
          <div className=" h-15 w-40">
            <Link href={"/"}>
              <Image src={Logo} alt="" />
            </Link>
          </div>
          <div className="flex flex-col space-y-2">
            <Link
              href={"/dashboard"}
              className="bg-white p-3 text-primary font-medium rounded-lg flex flex-row space-x-2 items-center"
            >
              <Icon
                icon="material-symbols:space-dashboard-rounded"
                height={20}
              />{" "}
              <p>Dashboard</p>
            </Link>
            <Link
              href={"/inventory"}
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
            <Icon icon="material-symbols:settings" height={20} />{" "}
            <p>Settings</p>
          </Link>
          <Link
            href={"/auth/signin"}
            className="  text-textSecondary font-medium rounded-lg flex flex-row space-x-2 items-center"
          >
            <Icon icon="ic:baseline-log-out" height={20} /> <p>Logout</p>
          </Link>
        </div>
      </div>
      {/* MainComponent */}
      <div className="  flex-1 p-7 flex space-x-7">
        <div className=" bg-white h-full w-full rounded-xl p-10 space-y-4">
          <h1 className="text-primary text-3xl font-bold">Report Details</h1>
          <div className="flex h-[500px] gap-5">
            <div className="flex-1">
              <div className="h-full w-full overflow-hidden rounded-xl">
                <Map />
              </div>
            </div>
            <div className="flex-1 flex divide-x-2">
              <div className=" flex-1">
                <div className="space-y-10">
                  <div className="space-y-2">
                      <h1 className=" font-bold text-xl">About poultry shop </h1>
                      <div className="space-y-2">
                        <div className="">
                          <h2 className="font-medium text-lg">Name</h2>
                          <h5 className="fontu-normal text-lg text-gray-500">
                            Rajesh poultry Shop
                          </h5>
                        </div>{" "}
                        <div className="">
                          <h2 className="font-medium text-lg">Owner Name</h2>
                          <h5 className="fontu-normal text-lg text-gray-500">
                            Rajesh Naik{" "}
                          </h5>
                        </div>{" "}
                        <div className="">
                          <h2 className="font-medium text-lg">Phone Number</h2>
                          <h5 className="fontu-normal text-lg text-gray-500">
                            915846205{" "}
                          </h5>
                        </div>{" "}
                      </div>
                  </div>
                  <div className="">
                    <h1 className=" font-bold text-xl">About Root Famer </h1>
                    <div className="space-y-2">
                      <div className="">
                        <h2 className="font-medium text-lg">Name</h2>
                        <h5 className="fontu-normal text-lg text-gray-500">
                          Ramesh poultry Farm
                        </h5>
                      </div>{" "}
                      <div className="">
                        <h2 className="font-medium text-lg">Owner Name</h2>
                        <h5 className="fontu-normal text-lg text-gray-500">
                          Rajesh Naik{" "}
                        </h5>
                      </div>{" "}
                      <div className="">
                        <h2 className="font-medium text-lg">Phone Number</h2>
                        <h5 className="fontu-normal text-lg text-gray-500">
                          915846205{" "}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-5 pl-5">
                <h1 className=" font-bold text-xl">Infection status </h1>
                <div className="space-y-4">
                  <div className="">
                    <h2 className="font-medium text-lg">Infected</h2>
                    <h5 className="fontu-normal text-lg text-gray-500">
                      Not Available
                    </h5>
                  </div>{" "}
                  <div className="">
                    <h2 className="font-medium text-lg">
                      Farmer report result
                    </h2>
                    <h5 className="fontu-normal text-lg text-gray-500">
                      Rajesh Naik{" "}
                    </h5>
                  </div>{" "}
                  <div className="">
                    <button className="bg-red-600 p-2 rounded-full w-full text-white">
                      Request A Report from farmer
                    </button>
                  </div>
                  <div className="">
                    <button className="bg-red-600 p-2 rounded-full w-full text-white">
                      Mark as Affected
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5">
            <h1 className="text-2xl font-bold text-primary mb-5">
              All reports
            </h1>
            <table className="w-full ">
              <thead className="text-primary font-semibold text-lg">
                <tr>
                  <td>Reporter Name</td>
                  <td>Address</td>
                  <td>Phone number</td>
                  <td>Symptomps start date</td>
                  <td>Doctors letter</td>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b   ">
                  <td className="py-2">Rohoit naik</td>
                  <td>tivim</td>
                  <td>9158230011</td>
                  <td>2/3/23</td>
                  <td>
                    {" "}
                    <button onClick={() => settoggle(!toggle)}>
                      <Icon icon="system-uicons:document" height={30} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
