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
      path: "/health-dashboard/reports",
      icon: "material-symbols:inventory-2",
    },
    {
      name: "Sample Requests",
      path: "/health-dashboard/sample-requests",
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
                {reportedSellers.length != 0 ? (
                  reportedSellers.map((reportedSeller) => (
                    <tr className="border-b   " key={reportedSeller.sellerId}>
                      <td className="py-2">{reportedSeller.sellerName}</td>
                      <td>1</td>
                      <td>
                        {" "}
                        <Link
                          href={`/health-dashboard/report-details/${reportedSeller.sellerId}`}
                        >
                          <Icon icon="iconoir:reports" height={30} />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td></td>
                    <td>No Sellers</td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
     <HealthSidebar/>
      </div>
    </div>
  );
};

export default Dashboard;
