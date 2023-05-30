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
  const [transferModalToggle, setTransferModalToggle] = useState(false);
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
          <div className="">
            <h5 className="text-primary text-lg font-semibold">Dashboard</h5>
            <p className="text-base font-semibold">Hi Sanket ProFarmer</p>
          </div>
          <div className="h-[350px] w-full rounded-xl overflow-hidden">
            <Map />
          </div>
          <div className="h-[300px] w-full rounded-xl bg-primary/10 p-4">
            <BarChart />
          </div>
          <div className="space-y-4">
            <h1 className="text-primary font-semibold">Highest Reports</h1>
            <div className="flex space-x-4">
              <div className="flex flex-[1] justify-between items-center bg-secondary rounded-xl p-4 space-x-4 font-medium">
                <div className="space-x-2 flex items-center">
                  <Icon
                    icon="mdi:virus-outline"
                    height={50}
                    className="text-red-600"
                  />
                  <div className="">
                    <p className="text-base font-semibold text-gray-600">
                      Mangesh Distribution
                    </p>
                    <p className="text-sm text-gray-600">Thivim,goa</p>
                  </div>
                </div>
                <p className="text-primary">30 reports</p>
              </div> 
              <div className="flex flex-[1] justify-between items-center bg-secondary rounded-xl p-4 space-x-4 font-medium">
                <div className="space-x-2 flex items-center">
                  <Icon
                    icon="mdi:virus-outline"
                    height={50}
                    className="text-red-600"
                  />
                  <div className="">
                    <p className="text-base font-semibold text-gray-600">
                      Mangesh Distribution
                    </p>
                    <p className="text-sm text-gray-600">Thivim,goa</p>
                  </div>
                </div>
                <p className="text-primary">30 reports</p>
              </div> 
            </div>
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
                <button className="bg-red-600 p-2 rounded-full w-full text-white">Mark as Affected</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {transferModalToggle && (
        <div className="absolute h-screen w-screen bg-gray-400/30 flex items-center justify-center">
          <div className="relative h-fit w-96 rounded-2xl shadow-lg bg-white p-6 flex flex-col items-center">
            <button
              onClick={() => setTransferModalToggle(false)}
              className="self-end"
            >
              <Icon icon="ic:round-close" height={30} />
            </button>
            <Image src={TapPay} height={150} width={150} />
            <h1 className="text-textSecondary  text-center text-xl">
              Tap Your NFC card to transfer batch
            </h1>
          </div>
        </div>
      )}
      {toggle && (
        <div className="absolute h-screen w-screen bg-gray-400/30 flex items-center justify-center">
          <div className="relative h-fit w-1/2 rounded-lg shadow-lg bg-white p-6 flex flex-col">
            <div className="flex justify-between pb-4">
              <p className="font-semibold">Submit chicken symptoms report</p>
              <button onClick={() => settoggle(false)}>
                <Icon icon="ic:round-close" height={30} />
              </button>
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <h5 className="font-medium text-sm text-textSecondary">
                  Check 4 chickens for symptoms
                </h5>
                <p className="text-xs">Tick the symptoms visible in chicken</p>
              </div>
              <div className="grid grid-cols-2 grid-rows-2 gap-10">
                {[1, 2, 3, 4].map((d, index) => (
                  <div className="space-y-2" key={index}>
                    <h5 className="font-medium text-sm text-textSecondary">
                      Chicken {d}
                    </h5>
                    <p className="text-xs">Symptom</p>
                    <Multiselect
                      options={state.options} // Options to display in the dropdown
                      displayValue="name" // Property name to display in the dropdown options
                      style={{
                        chips: {
                          // To change css for option container
                          backgroundColor: "#F0F0F0",
                          color: "#333333",
                        },
                      }}
                    />
                  </div>
                ))}
              </div>
              <Button value="Submit" rounded="rounded-full" text="text-xs" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
