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
        <div className=" bg-white h-full w-[75%] rounded-xl p-5 space-y-4">
          <h1 className="text-primary text-3xl font-bold">Reports</h1>
          <div className="p-5">
            <table className="w-full ">
              <thead className="text-primary font-medium">
                <tr>
                  <td>Seller Name</td>
                  <td>Root Farm name</td>
                  <td>Number of reports</td>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b   ">
                  <td className="py-2">Rajesh Poultry</td>
                  <td>Jay Farm </td>
                  <td>10</td>
                  <td>
                    {" "}
                    <button onClick={() => settoggle(!toggle)}>
                      <Icon icon="iconoir:reports" height={30} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white h-full rounded-xl w-[25%] p-5 space-y-4">
          <div className="flex flex-col justify-center items-center p-5 bg-secondary rounded-xl text-primary space-y-4">
            <h3 className=" font-semibold">Chicken Flue Alerts</h3>
            <Icon icon="solar:danger-triangle-linear" height={80} />
            <p className=" text-xs text-center font-medium">
              Increasing reports at mahesh poultry farm
            </p>
            <Button
              onClick={() => settoggle(true)}
              value="Take Action"
              rounded="rounded-full"
              text="text-xs"
            />
          </div>
          <div className="bg-secondary p-5 rounded-xl  text-primary items-center space-y-2">
            {" "}
            <h2 className="font-semibold">Submitted report ML predictions</h2>
            <div className="flex space-x-2 text-red-600">
              <Icon
                icon="solar:danger-triangle-linear"
                height={80}
                className="text-red-600"
              />
              <div className="space-y-2">
                <p className="text-2xl font-bold">Mahesh Farm</p>
                <p>ML results Positive for Avian Influenza</p>
                <button className="bg-red-600 p-2 rounded-full w-full text-white">
                  Mark as Affected
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
