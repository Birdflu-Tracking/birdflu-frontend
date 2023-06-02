import Image from "next/image";
import Link from "next/link";
import Logo from "@assets/logo/logo.svg";
import { Icon } from "@iconify/react";
import Button from "@/ui/Button/Button";
import BarChart from "@/features/ui/BarChart/BarChart";
import { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";

import HealthSidebar from "@/features/ui/HealthSidebar/HealthSidebar";
import Sidebar from "@/features/ui/Sidebar/Sidebar";
import axios from "axios";
const Dashboard = () => {
  let links = [
    {
      name: "Dashboard",
      path: "/health-dashboard",
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
  const [reportedSellers, setReportedSellers] = useState<
    Array<{
      sellerName: string;
      rootFarmId: string;
      rootFarmName: string;
      count: Number;
      sellerId: string;
    }>
  >([]);

  const getReportedSellers = async () => {
    await axios
      .get("http://localhost:8080/api/health-worker/reported-sellers/", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setReportedSellers(res.data.reportedSellers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getReportedSellers();
  }, []);

  return (
    <div className="flex w-screen h-screen bg-secondary ">
      {/* Sidebar */}
      <Sidebar links={links} />
      {/* MainComponent */}
      <div className="  flex-1 p-7 flex space-x-7">
        <div className=" bg-white h-full w-[75%] rounded-xl p-5 space-y-4">
          <h1 className="text-primary text-3xl font-bold">Sellers</h1>
          <div className="p-5">
            <table className="w-full ">
              <thead className="text-primary font-medium">
                <tr>
                  <td>Seller Name</td>
                  <td>Number of reports</td>
                </tr>
              </thead>
              <tbody>
                {reportedSellers.length != 0
                  ? reportedSellers.map((reportedSeller) => (
                      <tr className="border-b   " key={reportedSeller.sellerId}>
                        <td className="py-2">{reportedSeller.sellerName}</td>
                        <td>10</td>
                        <td>
                          {" "}
                          <Link
                            href={`/report-details/${reportedSeller.sellerId}`}
                          >
                            <Icon icon="iconoir:reports" height={30} />
                          </Link>
                        </td>
                      </tr>
                    ))
                  : ""}
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
