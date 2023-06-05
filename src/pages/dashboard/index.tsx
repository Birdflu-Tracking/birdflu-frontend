import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Button from "@/ui/Button/Button";
import BarChart from "@/features/ui/BarChart/BarChart";
import { useCallback, useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { ToastContainer, toast } from "react-toastify";

//assets
import "react-toastify/dist/ReactToastify.css";
import TapPay from "@assets/Images/tap-transfer.png";
import axios from "axios";
import Sidebar from "@/features/ui/Sidebar/Sidebar";
import Loading from "@/ui/LoadingScreen/Loading";
import { Batch, BatchSalesData, User, WsResponse } from "@/types";
import { firebaseDateToDate, firebaseDateToTime } from "@/utils";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const [batchSize, setBatchSize] = useState(0);
  const [deviceStatus, setDeviceStatus] = useState(false);
  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "material-symbols:space-dashboard-rounded",
    },
    {
      name: "Inventory",
      path: "/dashboard/inventory",
      icon: "material-symbols:inventory-2",
    },
    {
      name: "Sold Batches",
      path: "/dashboard/sold-batches",
      icon: "material-symbols:money",
    },
    {
      name: "Sample Requests",
      path: "/dashboard/sample-requests",
      icon: "material-symbols:money",
    },
  ];
  const [transferModalToggle, setTransferModalToggle] = useState(false);
  const [batchCreationLoading, setBatchCreationLoading] = useState(false);
  const [birdFluWs, setWS] = useState<WebSocket | null>(null);
  const [batches, setBatches] = useState<Array<Batch> | null>(null);
  const [soldBatches, setSoldBatches] = useState<Array<Batch> | null>(null);
  const [currentBatch, setCurrentBatch] = useState<string | null>(null);
  const [currentReports, setCurrentReports] = useState([]);
  const [nfcCode, setNfcCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [batchSalesData, setBatchSalesData] = useState<BatchSalesData | null>(
    null
  );
  const [cookies] = useCookies(["user"]);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  // const [tm, setTm] = useState<NodeJS.Timeout>();
  // const [pingInterval, setPingInterval] = useState<NodeJS.Timer>();

  const getCurrentReportRequests = useCallback(async () => {
    await axios
      .get("http://localhost:8080/api/user/current/requests", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setCurrentReports(res.data.reports);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const getSoldBatches = useCallback(async () => {
  //   await axios
  //     .get("http://localhost:8080/api/user/sold-batches", {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       let sorted = res.data.batche.map(batch)
  //       setSoldBatches(res.data.batches);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect(() => {
  //   getSoldBatches();
  // }, [getSoldBatches]);

  const handleMessage = async (msg: WsResponse) => {
    switch (msg.type) {
      case 0:
        console.log(msg.message);
        toast(`Device: ${msg.message}`);
        break;
      case 1:
        setNfcCode(msg.message);
        break;
    }
  };

  const handleTransferRead = (batchId: string) => {
    setCurrentBatch(batchId);
  };

  useEffect(() => {
    if (birdFluWs?.OPEN && currentBatch) {
      console.log("Reading");
      birdFluWs.send("read");
    }
  }, [currentBatch, birdFluWs]);

  const getDashboardData = useCallback(() => {
    axios
      .get("http://localhost:8080/api/user/total-batches-generated-and-sold", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setBatchSalesData(res.data);
        setLoading(false);
        setCurrentUser(cookies["user"]);
        console.log(cookies["user"])
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cookies]);

  const getBatches = useCallback(async () => {
    await axios
      .get("http://localhost:8080/api/user/batches", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setBatches(res.data.batches);
        getDashboardData();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getDashboardData]);

  useEffect(() => {
    if (nfcCode) {
      console.log(nfcCode, currentBatch);
      axios
        .post(
          `http://localhost:8080/api/user/transfer/batch`,
          {
            batchId: currentBatch,
            nfcCode: nfcCode,
          },
          { withCredentials: true }
        )
        .then(() => {
          setTransferModalToggle(false);
          getBatches();
          toast(`Batch ${currentBatch} transfered`);
          setCurrentBatch(null);
          setNfcCode(null);
        });
    }
  }, [nfcCode, getBatches, currentBatch]);

  const handleOpen = (ws: WebSocket) => {
    setWS(ws);
  };

  const startConn = useCallback(() => {
    const ws = new WebSocket("ws://birdflu.local:81");
    ws.onerror = (err) => console.error(err);
    ws.onopen = () => handleOpen(ws);
    ws.onclose = () => {
      setWS(ws);
      console.log("Closed");
    };
    ws.onmessage = (msg) => handleMessage(JSON.parse(msg.data.trim()));
    WebSocket;
  }, []);

  const handleBatchCreation = () => {
    if (batchSize > 0) {
      setBatchCreationLoading(true);
      axios
        .post(
          "http://localhost:8080/api/user/create/batch",
          { batchSize },
          { withCredentials: true }
        )
        .then((res) => {
          getBatches();
          //@ts-ignore
          setBatchCreationLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setBatchCreationLoading(false);
        });
    }
  };

  useEffect(() => {
    startConn();
    getBatches();
    getCurrentReportRequests();
  }, [startConn, getBatches, getCurrentReportRequests]);

  return loading ? (
    <Loading />
  ) : (
    <div className="flex w-screen h-screen bg-secondary ">
      {/* Sidebar */}
      <Sidebar links={links} />
      {/* MainComponent */}
      <div className="  flex-1 p-7 flex space-x-7">
        <div className=" bg-white h-full w-[75%] rounded-xl p-5 space-y-4">
          <div className="">
            <h5 className="text-primary text-lg font-semibold">Dashboard</h5>
            <p className="text-base font-semibold">
              Hi {currentUser ? currentUser.fullName : "Loading..."}{" "}
            </p>
          </div>
          <div className="h-[35%] flex space-x-4">
            <div className="bg-primary/10 rounded-xl p-5 flex-[1] space-y-2 flex flex-col">
              <h1
                className="text-primary text-2xl font-semibold flex-1
              "
              >
                <span className="text-5xl font-bold">
                  {batchSalesData ? batchSalesData.totalChickensSold : 0}
                </span>{" "}
                Chickens <br /> Sold this Month
              </h1>
              <div className="w-full flex-[2]">
                <BarChart />
              </div>
            </div>
            <div className=" space-y-4 flex-[1] self-end flex flex-col">
              <div className="text-sm self-end">
                <button className="py-2 px-4 bg-secondary rounded-l-xl">
                  Weekly
                </button>
                <button className="py-2 px-4 text-white bg-primary rounded-r-xl">
                  Monthly
                </button>
              </div>
              <div className="bg-secondary p-5 rounded-xl">
                <h1 className="text-primary text-4xl font-bold">
                  {batchSalesData ? batchSalesData.totalBatchesGenerated : 0}
                </h1>
                <p className="text-textSecondary font-medium">
                  Total Batches Generated
                </p>
              </div>
              <div className="bg-secondary p-5 rounded-xl">
                <h1 className="text-primary text-4xl font-bold">
                  {batchSalesData ? batchSalesData.totalBatchesSold : 0}
                </h1>
                <p className="text-textSecondary font-medium">
                  Total Batches Sold
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-primary font-semibold">Recent Batches Sold</h1>
            <div className="flex space-x-4">
              <div className="flex flex-[1] justify-between items-center bg-secondary rounded-xl p-4 space-x-4 font-medium">
                <div className="space-x-2 flex items-center">
                  <Icon
                    icon="material-symbols:supervised-user-circle"
                    className="text-primary"
                    height={30}
                  />
                  <p>Mangesh Distribution</p>
                </div>
                <p className="text-primary">Sold 1 batch</p>
              </div>
              <div className="flex flex-[1] justify-between items-center bg-secondary rounded-xl p-4 space-x-4 font-medium">
                <div className="space-x-2 flex items-center">
                  <Icon
                    icon="material-symbols:supervised-user-circle"
                    className="text-primary"
                    height={30}
                  />
                  <p>Mangesh Distribution</p>
                </div>
                <p className="text-primary">Sold 1 batch</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-secondary rounded-xl p-4 space-y-2">
            <h1 className="text-xl font-medium text-primary">Recent Batches</h1>
            <table className="w-full  ">
              <thead className="text-primary font-medium">
                <tr>
                  <td>Date</td>
                  <td>Time</td>
                  <td>BatchID</td>
                  <td>Batch Size</td>
                  <td>Transfer</td>
                </tr>
              </thead>

              <tbody>
                {batches ? (
                  batches.map((batch: Batch, index) => {
                    return (
                      <tr className="border-b   " key={index}>
                        <td className="py-2">
                          {firebaseDateToDate(batch.createdAt)}
                        </td>
                        <td>{firebaseDateToTime(batch.createdAt)}</td>
                        <td>{batch.batchId}</td>
                        <td>{batch.batchSize}</td>
                        <td>
                          <button
                            onClick={() => {
                              setTransferModalToggle(!transferModalToggle);
                              handleTransferRead(batch.batchId);
                            }}
                          >
                            <Icon
                              icon="fluent:location-live-20-regular"
                              height={30}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>No Batches</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white h-full rounded-xl w-[25%] p-5 space-y-4">
          {currentReports.length > 0 ? (
            <div className="flex flex-col justify-center items-center p-5 bg-secondary rounded-xl text-primary space-y-4">
              <h3 className=" font-semibold">Chicken Flue Alerts</h3>
              <Icon icon="solar:danger-triangle-linear" height={80} />
              <p className=" text-xs text-center font-medium">
                Possible flue spread from your farm please test chickens and
                submit report
              </p>
              <Link href={"/sample-requests"}>
                {" "}
                <Button
                  // onClick={() => settoggle(true)}
                  value="Submit report"
                  text="text-xs"
                />
              </Link>
            </div>
          ) : null}
          <div className="bg-secondary p-5 rounded-xl flex space-x-2 text-primary items-center ">
            {" "}
            <Icon icon="tabler:device-camera-phone" height={30} />
            <h2 className="font-semibold">
              Device{" "}
              {birdFluWs && birdFluWs.readyState == 0
                ? "Connecting"
                : birdFluWs?.readyState == 1
                ? "Connected"
                : birdFluWs?.readyState == 2
                ? "Closing"
                : "Disconnected"}
            </h2>
          </div>
          <div className="bg-secondary p-5 rounded-xl space-y-4 flex flex-col items-center">
            <h2 className="text-primary font-semibold">Create Batch</h2>
            <div className="w-full flex p-2 bg-white rounded-full justify-between items-center space-x-2 text-primary">
              <button onClick={() => setBatchSize((prev) => prev - 1)}>
                <Icon icon="mdi:minus-circle-outline" height={20} />
              </button>
              <input
                type="number"
                placeholder="No. of Chickens"
                className="w-[50px] hover:outline-none focus:outline-none "
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
              />
              <button onClick={() => setBatchSize((prev) => prev + 1)}>
                <Icon icon="mdi:plus-circle-outline" height={20} />
              </button>
            </div>
            <Button
              value={batchCreationLoading ? "Creating" : "Create Batch"}
              text="text-md"
              fullWidth
              onClick={() => handleBatchCreation()}
            />
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
            <Image src={TapPay} height={150} width={150} alt="Tap NFC Card" />
            <h1 className="text-textSecondary  text-center text-xl">
              Tap Your NFC card to transfer batch
            </h1>
          </div>
        </div>
      )}

      <ToastContainer toastStyle={{ backgroundColor: "#FFFFFF" }} />
    </div>
  );
};

export default Dashboard;
