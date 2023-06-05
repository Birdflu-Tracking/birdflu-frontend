import Image from "next/image";
import Link from "next/link";
import Logo from "@assets/logo/logo.svg";
import { Icon } from "@iconify/react";
import Button from "@/ui/Button/Button";
import BarChart from "@/features/ui/BarChart/BarChart";
import { use, useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";

//assets
import TapPay from "@assets/Images/tap-transfer.png";
import Map from "@/ui/Map/Map";
import HealthSidebar from "@/features/ui/HealthSidebar/HealthSidebar";
import Sidebar from "@/features/ui/Sidebar/Sidebar";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Loading from "@/ui/LoadingScreen/Loading";
import { SellerReports, User } from "@/types";
import { firebaseDateToDate } from "@/utils";

const Dashboard = () => {
  const [toggle, settoggle] = useState(false);
  const { sellerId } = useRouter().query;
  const [sellerReports, setSellerReports] =
    useState<Array<SellerReports> | null>(null);
  const [sellerData, setSellerData] = useState<User | null>(null);
  const [rootFarms, setRootFarms] = useState<Array<{
    farmId: string;
    farmData: User;
  }> | null>();
  const [loading, setLoading] = useState(true);
  const [sendRequestLoading, setSendRequestLoading] = useState(false);
  const router = useRouter();

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

  const handleSendFarmReportRequest = async (
    farmId: string,
    outletName: string
  ) => {
    setSendRequestLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/health-worker/send/symptom/request",
        { farmId },
        {
          withCredentials: true,
        }
      );
      setSendRequestLoading(false);
      toast(`Send request to ${outletName}`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/health-worker/reports/seller/${sellerId}`,
        { withCredentials: true }
      )
      .then((res) => {
        setSellerData(res.data.message.sellerData);
        setRootFarms(res.data.message.rootFarms);
        setSellerReports(res.data.message.sellerReports);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status == 404 && sellerId) {
          router.push("/404");
        }
      });
  }, [router, sellerId]);

  return loading ? (
    <Loading />
  ) : (
    <div className="flex w-screen h-screen bg-secondary ">
      {/* Sidebar */}
      <Sidebar links={links} />
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
            <div className="flex-1 flex-col space-y-6">
              <div className=" flex-1">
                <div className="space-y-2">
                  <h1 className=" font-bold text-xl">About poultry shop </h1>
                  {sellerData ? (
                    <div className="flex gap-10">
                      <div className="">
                        <h2 className="font-medium text-lg">Shop Name</h2>
                        <h5 className="fontu-normal text-lg text-gray-500">
                          {sellerData.outletName}
                        </h5>
                      </div>{" "}
                      <div className="">
                        <h2 className="font-medium text-lg">Owner Name</h2>
                        <h5 className="fontu-normal text-lg text-gray-500">
                          {`${sellerData.fullName} `}
                        </h5>
                      </div>{" "}
                      <div className="">
                        <h2 className="font-medium text-lg">Phone Number</h2>
                        <h5 className="fontu-normal text-lg text-gray-500">
                          {sellerData.phoneNumber}
                        </h5>
                      </div>{" "}
                      <div className="">
                        <h2 className="font-medium text-lg">Address</h2>
                        <h5 className="fontu-normal text-lg text-gray-500">
                          {sellerData.phoneNumber}
                        </h5>
                      </div>{" "}
                    </div>
                  ) : (
                    "Loading..."
                  )}
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <h1 className=" font-bold text-xl">All Root Farms</h1>
                <table className="w-full ">
                  <thead className="text-primary font-medium">
                    <tr>
                      <td>Farm Name</td>
                      <td>Owner Name</td>
                      <td>Owner Contact</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {rootFarms
                      ? rootFarms.map((farm) => {
                          return (
                            <tr className="border-b   " key={farm.farmId}>
                              <td className="py-2">
                                {farm.farmData.outletName}
                              </td>
                              <td className="py-2">{farm.farmData.fullName}</td>
                              <td className="py-2">
                                {farm.farmData.phoneNumber}
                              </td>

                              <td className="py-2">
                                <Button
                                  value={
                                    sendRequestLoading
                                      ? "Sending request..."
                                      : "Request"
                                  }
                                  disabled={sendRequestLoading}
                                  onClick={() =>
                                    handleSendFarmReportRequest(
                                      farm.farmId,
                                      farm.farmData.outletName
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          );
                        })
                      : "No Root Farms"}
                  </tbody>
                </table>
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
                {sellerReports
                  ? sellerReports.map((sellerReport) => {
                      console.log(sellerReport);
                      return (
                        <tr className="border-b   " key={sellerReport.reportId}>
                          <td className="py-2">
                            {sellerReport.reportData.reporterName}
                          </td>
                          <td>{sellerReport.reportData.poultryShopName}</td>
                          <td>{sellerReport.reportData.phoneNumber}</td>
                          <td>
                            {firebaseDateToDate(
                              sellerReport.reportData.symptomStartDate
                            )}
                          </td>
                          <td>
                            {" "}
                            <button onClick={() => settoggle(!toggle)}>
                              <Icon icon="system-uicons:document" height={30} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : "No Sellers"}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer toastStyle={{ backgroundColor: "#FFFFFF" }} />
    </div>
  );
};

export default Dashboard;
