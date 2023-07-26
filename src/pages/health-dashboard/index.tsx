import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Button from "@/ui/Button/Button";
import BarChart from "@/features/ui/BarChart/BarChart";
import { useCallback, useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";

//assets
import TapPay from "@assets/Images/tap-transfer.png";
import Map from "@/ui/Map/Map";
import HealthSidebar from "@/features/ui/HealthSidebar/HealthSidebar";
import Sidebar from "@/features/ui/Sidebar/Sidebar";
import { useCookies } from "react-cookie";
import { User } from "@/types";
import axios from "axios";
import { firebaseDateToDate } from "@/utils";
const Dashboard = () => {
  const [toggle, settoggle] = useState(false);
  const [transferModalToggle, setTransferModalToggle] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [cookie] = useCookies(["user"]);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [allReports, setAllReports] = useState<any | undefined>(undefined);
  const [highestReports, setHighestReports] = useState<any | undefined>(
    undefined
  );

  const state = {
    options: [
      { name: "Depression", id: 1 },
      { name: "Combs, wattle, bluish face region", id: 2 },
      { name: "Swollen face region", id: 3 },
      { name: "Balance disorders", id: 4 },
      { name: "Narrowness of eyes", id: 5 },
    ],
  };
  let links = [
    {
      name: "Dashboard",
      path: "/health-dashboard",
      icon: "material-symbols:space-dashboard-rounded",
    },
    {
      name: "Reports",
      path: "/health-dashboard/reports",
      icon: "material-symbols:inventory-2",
    },
    {
      name: "Sample Requests",
      path: "/health-dashboard/sample-requests",
      icon: "material-symbols:inventory-2",
    },
  ];

  useEffect(() => {
    getUserReports();
    setCurrentUser(cookie["user"]);
  }, [cookie]);
  const getUserReports = useCallback(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/health-worker/reports/users/`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        // setBatchSalesData(res.data);
        let t = res.data.sellerReports.reduce((result: any, d: any) => {
          console.log(firebaseDateToDate(d.createdAt));
          result[firebaseDateToDate(d.createdAt)] =
            result[firebaseDateToDate(d.createdAt)] != undefined
              ? ++result[firebaseDateToDate(d.createdAt)]
              : 0 + 1;

          return result;
        }, {});
        let t2 = res.data.sellerReports.reduce((result: any, d: any) => {
          result[d.poultryShopName] =
            result[d.poultryShopName] != undefined
              ? ++result[d.poultryShopName]
              : 0;

          return result;
        }, {});
        console.log(t, t2);
        setAllReports(
          Object.keys(t).map((key) => ({ date: key, value: t[key] }))
        );
        let a = Object.keys(t2).map((key) => ({
          shopName: key,
          reports: t2[key],
        }));

        setHighestReports(a.sort((a, b) => a.reports - b.reports).slice(-2));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cookie]);
  return (
    <div className="flex w-screen h-screen bg-secondary ">
      {/* Sidebar */}
      <Sidebar links={links} />
      {/* MainComponent */}
      <div className="  flex-1 p-7 flex space-x-7">
        <div className=" bg-white h-full w-[75%] rounded-xl p-5 space-y-4">
          <div className="">
            <h5 className="text-primary text-lg font-semibold">Dashboard</h5>
            <p className="text-base font-semibold">
              Hi {currentUser ? currentUser.fullName : ""}
            </p>
          </div>
          <div className="h-[350px] w-full rounded-xl overflow-hidden relative flex justify-center">
            {showSearch ? (
              <div className="absolute top-10 m-auto h-fit  bg-white z-10  rounded-xl shadow-md p-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex gap-3">
                    <div className="w-full bg-secondary rounded-md p-2 flex items-center gap-2">
                      <Icon
                        icon="ic:outline-search"
                        height={20}
                        className="text-gray-600"
                      />
                      <input
                        type="text"
                        className="bg-transparent  outline-none italic"
                        placeholder="Search Location"
                      />
                    </div>
                    <button onClick={() => setShowSearch(false)}>
                      <Icon
                        icon="ic:round-close"
                        height={25}
                        className="text-gray-600"
                      />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <h5 className="bg-primary px-3 py-1 text-white rounded-full">
                      Poultry Shops
                    </h5>
                    <h5 className="bg-primary px-3 py-1 text-white rounded-full">
                      Farms
                    </h5>
                    <h5 className="bg-primary px-3 py-1 text-white rounded-full">
                      Distributors
                    </h5>
                  </div>
                </div>
                {/* list */}
                <div className="space-y-1">
                  <h1 className="font-medium text-base ">Manoj Chicken Shop</h1>
                  <p className=" text-sm text-gray-500">
                    Near blue dart office, khorlim,mapusa goa
                  </p>
                </div>
              </div>
            ) : (
              <button
                className="absolute bg-white shadow-md rounded-md p-2 flex items-center right-5 top-5 z-10"
                onClick={() => setShowSearch(true)}
              >
                <Icon
                  icon="ic:outline-search"
                  height={20}
                  className="text-gray-600"
                />
              </button>
            )}
            <Map />
          </div>
          <div className="h-[300px] w-full rounded-xl bg-primary/10 p-4">
            {allReports ? <BarChart data={allReports} /> : "No Report Data"}
          </div>
          <div className="space-y-4">
            <h1 className="text-primary font-semibold">Highest Reports</h1>
            <div className="flex space-x-4">
              {highestReports
                ? highestReports.map((d: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-[1] justify-between items-center bg-secondary rounded-xl p-4 space-x-4 font-medium"
                      >
                        <div className="space-x-2 flex items-center">
                          <Icon
                            icon="mdi:virus-outline"
                            height={50}
                            className="text-red-600"
                          />
                          <div className="">
                            <p className="text-base font-semibold text-gray-600">
                              {d.shopName}
                            </p>
                            <p className="text-sm text-gray-600">Thivim,goa</p>
                          </div>
                        </div>
                        <p className="text-primary">{d.reports} reports</p>
                      </div>
                    );
                  })
                : "No highest Reports"}
            </div>
          </div>
        </div>
        <HealthSidebar />
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
            <Image src={TapPay} height={150} width={150} alt="tap-to-pay" />
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
              <Button value="Submit" text="text-xs" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
