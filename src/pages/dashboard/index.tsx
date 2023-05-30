import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Button from "@/ui/Button/Button";
import BarChart from "@/features/ui/BarChart/BarChart";
import { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";

//assets
import TapPay from "@assets/Images/tap-transfer.png";
import axios from "axios";
import Sidebar from "@/features/ui/Sidebar/Sidebar";

type WsResponse = {
  message: string,
  type: Number
};

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
      path: "/inventory",
      icon: "material-symbols:inventory-2",
    },
  ];
  const [toggle, settoggle] = useState(false);
  const [transferModalToggle, setTransferModalToggle] = useState(false);
  const [birdFluWs, setWS] = useState<WebSocket | null>(null);
  const [tm, setTm] = useState<NodeJS.Timeout>();
  const [pingInterval, setPingInterval] = useState<NodeJS.Timer>()

  const state = {
    options: [
      { name: "Depression", id: 1 },
      { name: "Combs, wattle, bluish face region", id: 2 },
      { name: "Swollen face region", id: 3 },
      { name: "Balance disorders", id: 4 },
      { name: "Narrowness of eyes", id: 5 },
    ],
  };

  // For timeout
  const ping = () => {
    if (birdFluWs?.OPEN) {
      birdFluWs?.send('__ping__');
      const tm = setTimeout(function () {
        birdFluWs?.close();
      }, 5000);
      setTm(tm);
    } else {
      startConn();
    }
  }

  const pong = () => {
    clearTimeout(tm);
  }

  const handleMessage = async (msg: WsResponse) => {
    if (msg.message == "__pong__") {
      pong();
    }

    switch (msg.type) {
      case 0:
        console.log(msg.message);
        break;
      case 1:
        // await axios.post(`http://localhost:8080/api/user/transfer/batch`, {
        //   "batchId": "FGYkgUxh2WMxlF6lMLyw",
        //   "distributorId": null,
        //   "sellerId": null
        // });
        console.log(msg.message);
        break;
    }
  }

  const handleTransferRead = () => {
    if (birdFluWs?.OPEN) {
      console.log("Reading")
      birdFluWs.send("read")
    }
  }

  const handleOpen = (ws: WebSocket) => {
    setWS(ws)
    if (pingInterval) {
      clearInterval(pingInterval)
    }
    setPingInterval(setInterval(ping, 30000))
  }

  const startConn = () => {
    const ws = new WebSocket("ws://birdflu.local:81");
    ws.onerror = err => console.error(err);
    ws.onopen = () => handleOpen(ws);
    ws.onclose = () => { setWS(ws); console.log("Closed") }
    ws.onmessage = msg => handleMessage(JSON.parse(msg.data.trim())); WebSocket
  }

  useEffect(() => {
    startConn();
  }, [])

  return (
    <div className="flex w-screen h-screen bg-secondary ">
      {/* Sidebar */}
      <Sidebar links={links} />
      {/* MainComponent */}
      <div className="  flex-1 p-7 flex space-x-7">
        <div className=" bg-white h-full w-[75%] rounded-xl p-5 space-y-4">
          <div className="">
            <h5 className="text-primary text-lg font-semibold">Dashboard</h5>
            <p className="text-base font-semibold">Hi Sanket ProFarmer</p>
          </div>
          <div className="h-[35%] flex space-x-4">
            <div className="bg-primary/10 rounded-xl p-5 flex-[1] space-y-2 flex flex-col">
              <h1
                className="text-primary text-2xl font-semibold flex-1
              "
              >
                <span className="text-5xl font-bold">132</span> Chickens <br />{" "}
                Sold this Month
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
                <h1 className="text-primary text-4xl font-bold">3411</h1>
                <p className="text-textSecondary font-medium">
                  Total Batches Generated
                </p>
              </div>
              <div className="bg-secondary p-5 rounded-xl">
                <h1 className="text-primary text-4xl font-bold">2311</h1>
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
                <tr className="border-b   ">
                  <td className="py-2">12 Mar 23</td>
                  <td>17:00</td>
                  <td>2404</td>
                  <td>10</td>
                  <td>
                    <button
                      onClick={() => {
                        setTransferModalToggle(!transferModalToggle)
                        handleTransferRead();
                      }
                      }
                    >
                      <Icon
                        icon="fluent:location-live-20-regular"
                        height={30}
                      />
                    </button>
                  </td>
                </tr>
                <tr className="border-b   ">
                  <td className="py-2">12 Mar 23</td>
                  <td>17:00</td>
                  <td>2404</td>
                  <td>10</td>
                  <td>
                    <button
                      onClick={() =>
                        setTransferModalToggle(!transferModalToggle)
                      }
                    >
                      <Icon
                        icon="fluent:location-live-20-regular"
                        height={30}
                      />
                    </button>
                  </td>
                </tr>
                <tr className="border-b   ">
                  <td className="py-2">12 Mar 23</td>
                  <td>17:00</td>
                  <td>2404</td>
                  <td>10</td>
                  <td>
                    <button
                      onClick={() => {
                        setTransferModalToggle(!transferModalToggle)
                      }}
                    >
                      <Icon
                        icon="fluent:location-live-20-regular"
                        height={30}
                      />
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
              Possible flue spread from your farm please test chickens and
              submit report
            </p>
            <Button
              onClick={() => settoggle(true)}
              value="Submit report"
              rounded="rounded-full"
              text="text-xs"
            />
          </div>
          <div className="bg-secondary p-5 rounded-xl flex space-x-2 text-primary items-center ">
            {" "}
            <Icon icon="tabler:device-camera-phone" height={30} />
            <h2 className="font-semibold">Device {birdFluWs && birdFluWs.readyState == 0 ? "Connecting" : birdFluWs?.readyState == 1 ? "Connected" : birdFluWs?.readyState == 2 ? "Closing" : "Closed"}</h2>
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
              />
              <button onClick={() => setBatchSize((prev) => prev + 1)}>
                <Icon icon="mdi:plus-circle-outline" height={20} />
              </button>
            </div>
            <Button
              value="Create Batch"
              rounded="rounded-full"
              text="text-md"
              fullWidth
              onClick={() => { }}
            />

        
          </div>
        </div>
      </div>
      {
        transferModalToggle && (
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
        )
      }
      {
        toggle && (
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
        )
      }
    </div >
  );
};

export default Dashboard;
