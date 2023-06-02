import Image from "next/image";
import Link from "next/link";
import Logo from "@assets/logo/logo.svg";
import { Icon } from "@iconify/react";
import Button from "@/ui/Button/Button";
import BarChart from "@/features/ui/BarChart/BarChart";
import { useEffect, useState } from "react";
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

type UserType = "farmer" | "distributor" | "seller";

type User = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  outletAddress: string;
  type: UserType;
  outletName: string;
  latitude: number;
  longitude: number;
  infected: boolean;
};

const Dashboard = () => {
  const [toggle, settoggle] = useState(false);
  const { sellerId } = useRouter().query;
  const [sellerReports, setSellerReports] = useState<Array<{
    reportId: string;
    reportData: Object;
  }> | null>(null);
  const [sellerData, setSellerData] = useState<User | null>(null);
  const [rootFarms, setRootFarms] = useState<Array<{
    farmId: string;
    farmData: User;
  }> | null>();
  const [loading, setLoading] = useState(true);
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
      path: "/health-reports",
      icon: "material-symbols:inventory-2",
    },
  ];

  const handleSendFarmReportRequest = async () => {
    console.log("SENT_FARM_REQUEST");

    rootFarms?.map(async (farm: { farmId: string; farmData: User }) => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/health-worker/send/symptom/request",
          { farmId: farm.farmId },
          {
            withCredentials: true,
          }
        );
        toast(`Send request to ${farm.farmData.outletName}`);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    });
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
        if (err.response.status == 404) {
          console.log(err);
          router.push("/404")
        }
      });
  }, [sellerId]);

  const handleSendRequest = () => {};

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
            <div className="flex-1 flex divide-x-2">
              <div className=" flex-1">
                <div className="space-y-10">
                  <div className="space-y-2">
                    <h1 className=" font-bold text-xl">About poultry shop </h1>
                    {sellerData ? (
                      <div className="space-y-2">
                        <div className="">
                          <h2 className="font-medium text-lg">Name</h2>
                          <h5 className="fontu-normal text-lg text-gray-500">
                            {sellerData.outletName}
                          </h5>
                        </div>{" "}
                        <div className="">
                          <h2 className="font-medium text-lg">Owner Name</h2>
                          <h5 className="fontu-normal text-lg text-gray-500">
                            {`${sellerData.firstName} ${sellerData.lastName}`}
                          </h5>
                        </div>{" "}
                        <div className="">
                          <h2 className="font-medium text-lg">Phone Number</h2>
                          <h5 className="fontu-normal text-lg text-gray-500">
                            {sellerData.phoneNumber}
                          </h5>
                        </div>{" "}
                      </div>
                    ) : (
                      "Loading..."
                    )}
                  </div>
                  <div className="">
                    <h1 className=" font-bold text-xl">About Root Famer </h1>
                    {rootFarms
                      ? rootFarms.map((farm) => {
                          return (
                            <div className="space-y-2" key={farm.farmId}>
                              <div className="">
                                <h2 className="font-medium text-lg">Name</h2>
                                <h5 className="fontu-normal text-lg text-gray-500">
                                  {farm.farmData.outletName}
                                </h5>
                              </div>{" "}
                              <div className="">
                                <h2 className="font-medium text-lg">
                                  Owner Name
                                </h2>
                                <h5 className="fontu-normal text-lg text-gray-500">
                                  {`${farm.farmData.firstName} ${farm.farmData.lastName}`}
                                </h5>
                              </div>{" "}
                              <div className="">
                                <h2 className="font-medium text-lg">
                                  Phone Number
                                </h2>
                                <h5 className="fontu-normal text-lg text-gray-500">
                                  {farm.farmData.phoneNumber}
                                </h5>
                              </div>
                            </div>
                          );
                        })
                      : "Loading..."}
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-5 pl-5">
                <h1 className=" font-bold text-xl">Infection status </h1>
                <div className="space-y-4">
                  <div className="">
                    <h2 className="font-medium text-lg">Infected</h2>
                    <h5 className="fontu-normal text-lg text-gray-500">
                      {sellerData
                        ? sellerData.infected
                          ? "Infected"
                          : "No Infected"
                        : "Loading"}
                    </h5>
                  </div>{" "}
                  <div className="">
                    <h2 className="font-medium text-lg">
                      Farmer report ML result
                    </h2>
                    <h5 className="fontu-normal text-lg text-gray-500">
                      Avian Influenza
                    </h5>
                  </div>{" "}
                  <div className="">
                    <h2 className="font-medium text-lg">
                      Report Request Status
                    </h2>
                    <h5 className="fontu-normal text-lg text-gray-500">
                      Not requested{" "}
                    </h5>
                  </div>{" "}
                  <div className="">
                    <button
                      className="bg-red-600 p-2 rounded-full w-full text-white"
                      onClick={() => {
                        handleSendFarmReportRequest();
                      }}
                    >
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
                {sellerReports ? (
                  sellerReports.map((sellerReport) => {
                    return (
                      <tr className="border-b   " key={sellerReport.reportId}>
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
                    );
                  })
                ) : (
                  <tr>
                    <td>Loading...</td>
                    <td>Loading...</td>
                    <td>Loading...</td>
                    <td>Loading...</td>
                    <td>Loading...</td>
                  </tr>
                )}
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
