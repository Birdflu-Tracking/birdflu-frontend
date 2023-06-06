import Image from "next/image";
import Link from "next/link";
import Logo from "@assets/logo/logo.svg";
import { Icon } from "@iconify/react";
import Button from "@/ui/Button/Button";
import BarChart from "@/features/ui/BarChart/BarChart";
import { useCallback, useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import "react-toastify/dist/ReactToastify.css";

import HealthSidebar from "@/features/ui/HealthSidebar/HealthSidebar";
import Sidebar from "@/features/ui/Sidebar/Sidebar";
import axios from "axios";
import { CurrentRequests, FarmReports, User } from "@/types";
import { firebaseDateToDate } from "@/utils";
import { ToastContainer, toast } from "react-toastify";

const MarkBtn = ({
  reportId,
  farmData,
  type,
  getCurrentRequests,
}: {
  reportId: string;
  farmData: User;
  type: string;
  getCurrentRequests: Function;
}) => {
  const [loading, setLoading] = useState(false);

  const handleMarkInfected = async (reportId: string, farmData: User) => {
    setLoading(true);
    axios
      .post(
        `http://localhost:8080/api/health-worker/mark/${type}`,
        { requestId: reportId },
        { withCredentials: true }
      )
      .then(() => {
        toast(`Marked farm ${farmData.outletName} as infected`);
        setLoading(false);
        getCurrentRequests();
      })
      .catch((err) => {
        if (err.response.status == 400) {
          toast(`Cannot mark infected, prediction is not available`);
        }
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Button
      value={loading ? `Marking ${type}...` : `Mark ${type}`}
      onClick={() => handleMarkInfected(reportId, farmData)}
      disabled={loading}
    />
  );
};

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
  const [currentRequests, setCurrentRequests] = useState<
    CurrentRequests | undefined
  >(undefined);

  const getCurrentRequests = useCallback(async () => {
    axios
      .get("http://localhost:8080/api/health-worker/current/requests", {
        withCredentials: true,
      })
      .then(({ data }) => {
        setCurrentRequests(data.reports);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    getCurrentRequests();
  }, [getCurrentRequests]);

  return (
    <div className="flex w-screen h-screen bg-secondary ">
      {/* Sidebar */}
      <Sidebar links={links} />
      {/* MainComponent */}
      <div className="  flex-1 p-7 flex space-x-7">
        <div className=" bg-white h-full w-[75%] rounded-xl p-5 space-y-4">
          <h1 className="text-primary text-3xl font-bold">
            Chicken Sample Requests
          </h1>
          <div className="p-5">
            <table className="w-full ">
              <thead className="text-primary font-medium">
                <tr>
                  <td>Request Id</td>
                  <td>Requested At</td>
                  <td>Farmer</td>
                  <td>Submitted At </td>
                  <td>Flu Status</td>
                  <td>ML Prediction</td>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {currentRequests?.submitted
                  ? currentRequests.submitted.map((request) => {
                      return (
                        <tr className="border-b   " key={request.reportId}>
                          <td className="py-2">
                            {request.reportId.substring(0, 9)}...
                          </td>
                          <td className="py-2">
                            {firebaseDateToDate(request.reportData.initiatedAt)}
                          </td>
                          <td className="py-2">
                            {request.farmData.outletName}
                          </td>
                          <td className="py-2">
                            {request.reportData.submitted
                              ? firebaseDateToDate(
                                  request.reportData.submittedAt
                                )
                              : "Not Submitted"}
                          </td>
                          <td className="py-2">
                            {request.farmData.infected
                              ? "Affected"
                              : "Not Affected"}
                          </td>
                          <td className="py-2">
                            {request.reportData.predictionResult == null
                              ? "-"
                              : request.reportData.predictionResult}
                          </td>
                          <td className="py-2">
                            {!request.farmData.infected ? (
                              <MarkBtn
                                reportId={request.reportId}
                                getCurrentRequests={getCurrentRequests}
                                farmData={request.farmData}
                                type="infected"
                              />
                            ) : (
                              ""
                            )}
                          </td>
                          <td className="py-2">
                            {request.farmData.infected ? (
                              <MarkBtn
                                reportId={request.reportId}
                                farmData={request.farmData}
                                getCurrentRequests={getCurrentRequests}
                                type="uninfected"
                              />
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : ""}
                {currentRequests?.notSubmitted
                  ? currentRequests.notSubmitted.map((request) => {
                      return (
                        <tr className="border-b   " key={request.reportId}>
                          <td className="py-2">
                            {request.reportId.substring(0, 9)}...
                          </td>
                          <td className="py-2">
                            {firebaseDateToDate(request.reportData.initiatedAt)}
                          </td>
                          <td className="py-2">
                            {request.farmData.outletName}
                          </td>
                          <td className="py-2">
                            {request.reportData.submitted
                              ? firebaseDateToDate(
                                  request.reportData.submittedAt
                                )
                              : "Not Submitted"}
                          </td>
                          <td className="py-2">
                            {request.farmData.infected
                              ? "Affected"
                              : "Not Affected"}
                          </td>
                          <td className="py-2">
                            {request.reportData.predictionResult == null
                              ? "Not Available"
                              : request.reportData.predictionResult}
                          </td>
                          <td className="py-2">
                            {!request.farmData.infected ? (
                              <MarkBtn
                                reportId={request.reportId}
                                getCurrentRequests={getCurrentRequests}
                                farmData={request.farmData}
                                type="infected"
                              />
                            ) : (
                              ""
                            )}
                          </td>
                          <td className="py-2">
                            {request.farmData.infected ? (
                              <MarkBtn
                                reportId={request.reportId}
                                getCurrentRequests={getCurrentRequests}
                                farmData={request.farmData}
                                type="uninfected"
                              />
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      );
                    })
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
      <ToastContainer toastStyle={{ backgroundColor: "#FFFFFF" }} />
    </div>
  );
};

export default Dashboard;
