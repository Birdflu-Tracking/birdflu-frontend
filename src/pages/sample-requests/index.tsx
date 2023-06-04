import Image from "next/image";
import Link from "next/link";
import Logo from "@assets/logo/logo.svg";
import { Icon } from "@iconify/react";
import Button from "@/ui/Button/Button";
import ChickenIcon from "@assets/Images/chicken-icon.svg";
import PieChart from "@/features/ui/PieChart/PieChart";
import Sidebar from "@/features/ui/Sidebar/Sidebar";
import { use, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BatchWithBuyer, FarmReports } from "@/types";
import { firebaseDateToDate, firebaseDateToTime } from "@/utils";
import Multiselect from "multiselect-react-dropdown";

const SampleRequests = () => {
  const [loading, setLoading] = useState(false);
  const [reportSubmitLoading, setReportSubmitLoading] = useState(false);
  const [toggle, settoggle] = useState(false);
  const [error, setError] = useState("");
  const [sampleSymptoms, setSampleSymptoms] = useState([]);
  const [currentReports, setCurrentReports] = useState([]);
  const [requestId, setRequestId] = useState<string | undefined>(undefined);

  const state = {
    options: [
      { name: "Depression", id: 1 },
      { name: "Combs Wattle Blush Face", id: 2 },
      { name: "Swollen Face Region", id: 3 },
      { name: "Balance Desorder", id: 4 },
      { name: "Narrowness Of Eyes", id: 5 },
    ],
  };
  let [links] = useState([
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
    {
      name: "Sold Batches",
      path: "/sold-batches",
      icon: "material-symbols:money",
    },
    {
      name: "Sample Requests",
      path: "/sample-requests",
      icon: "material-symbols:money",
    },
  ]);
  const getCurrentReportRequests = useCallback(async () => {
    setLoading(true);
    await axios
      .get("http://localhost:8080/api/user/current/requests", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setCurrentReports(res.data.reports);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const handleSymptomSelect = (
    selectedList: any,
    selectedItem: any,
    sampleNumber: number
  ) => {
    let symptomsList = selectedList.map((d: { name: any; }) => d.name);
    let prev = [...sampleSymptoms];
    //@ts-ignore
    prev[sampleNumber] = symptomsList;
    console.log(prev);
    setSampleSymptoms(prev);
  };
  const handleReportSubmission = async () => {
    try {
      if (sampleSymptoms.length == 4 && requestId) {
        setReportSubmitLoading(true);
        await axios.post(
          "http://localhost:8080/api/user/farmer/report",
          {
            requestId: requestId,
            chickenSymptoms: sampleSymptoms,
          },
          { withCredentials: true }
        );
        setReportSubmitLoading(false);
        setRequestId(undefined);
        settoggle(false);
        getCurrentReportRequests();
      } else {
        setError("Please add symptoms for all four chickens");
      }
    } catch (err) {
      setRequestId(undefined);
      setReportSubmitLoading(false);
      setError("Error Submitting");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);
  useEffect(() => {
    getCurrentReportRequests();
  }, [getCurrentReportRequests]);

  return (
    <div className="flex w-screen h-screen bg-secondary ">
      {/* Sidebar */}
      <Sidebar links={links} />
      {/* MainComponent */}
      <div className="  flex-1 p-7 flex space-x-7">
        <div className=" bg-white h-full w-full rounded-xl p-5 space-y-4">
          <h1 className="text-primary text-3xl font-bold">Sample Requests</h1>
          <div className="p-5 ">
            <table className="w-full ">
              <thead className="text-primary font-semibold text-xl">
                <tr>
                  <td>Request Id</td>
                  <td>Date</td>
                  <td>Time</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {currentReports.length > 0 ? (
                  currentReports.map((report: FarmReports, index) => (
                    <tr className="border-b   " key={index}>
                      <td className="py-2">{report.reportId}</td>
                      <td className="py-2">
                        {firebaseDateToDate(report.initiatedAt)}
                      </td>
                      <td className="py-2">
                        {firebaseDateToTime(report.initiatedAt)}
                      </td>
                      <td className="py-2">
                        <Button
                          value="Submit report"
                          onClick={() => {
                            settoggle(true);
                            setRequestId(report.reportId);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-5">No Requests</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {toggle && (
        <div className="absolute h-screen w-screen bg-gray-400/30 flex items-center justify-center">
          <div className="relative h-fit w-1/2 rounded-lg shadow-lg bg-white p-6 flex flex-col">
            <div className="flex justify-between pb-3">
              <p className="font-semibold">Submit chicken symptoms report</p>
              <button onClick={() => settoggle(false)}>
                <Icon icon="ic:round-close" height={30} />
              </button>
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <p className="text-red-700 font-bold ">{error}</p>
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
                      onSelect={(selectedList: any, selectedItem: any) =>
                        handleSymptomSelect(selectedList, selectedItem, index)
                      }
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
              <Button
                value={reportSubmitLoading ? "Submitting..." : "Submit"}
                text="text-xs"
                disabled={reportSubmitLoading == true}
                onClick={() => handleReportSubmission()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleRequests;
