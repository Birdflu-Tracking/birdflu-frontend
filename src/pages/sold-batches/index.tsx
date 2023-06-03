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
import { BatchWithBuyer } from "@/types";
import { firebaseDateToDate, firebaseDateToTime } from "@/utils";

const SoldBatches = () => {
  const [batches, setBatches] = useState<Array<BatchWithBuyer> | null>(null);
  const [loading, setLoading] = useState(false);

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
      name:"Sample Requests",
      path:"/sample-requests",
      icon: "material-symbols:money",

    }
  ]);

  const getBatches = useCallback(async () => {
    await axios
      .get("http://localhost:8080/api/user/sold-batches", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setBatches(res.data.batches);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getBatches();
  }, [getBatches]);

  return (
    <div className="flex w-screen h-screen bg-secondary ">
      {/* Sidebar */}
      <Sidebar links={links} />
      {/* MainComponent */}
      <div className="  flex-1 p-7 flex space-x-7">
        <div className=" bg-white h-full w-[75%] rounded-xl p-5 space-y-4">
          <h1 className="text-primary text-3xl font-bold">Sold Batches</h1>
          <div className="p-5 ">
            <table className="w-full ">
              <thead className="text-primary font-semibold text-xl">
                <tr>
                  <td>Date</td>
                  <td>Time</td>
                  <td>BatchID</td>
                  <td>Batch Size</td>
                  <td>Distributor</td>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {batches
                  ? batches.map((batch: BatchWithBuyer, index) => (
                      <tr className="border-b   " key={batch.batchId}>
                        <td className="py-2">
                          {firebaseDateToDate(batch.createdAt)}
                        </td>
                        <td>{firebaseDateToTime(batch.createdAt)}</td>
                        <td>{batch.batchId}</td>
                        <td>{batch.batchSize}</td>
                        <td>{batch.buyer.outletName}</td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white h-full rounded-xl w-[25%] p-5 space-y-4">
          <h1 className="text-primary text-xl font-bold">Market Summary</h1>
          <div className="bg-secondary rounded-xl p-4 flex justify-between">
            <div className="">
              <h5 className="text-textSecondary/75 font-semibold">
                Total Chickens
              </h5>
              <h5 className="text-4xl text-primary font-bold">100</h5>
            </div>
            <div className="self-end">
              <Image src={ChickenIcon} alt="test" />
            </div>
          </div>{" "}
          <div className="bg-secondary rounded-xl p-4 flex justify-between">
            <div className="">
              <h5 className="text-textSecondary/75 font-semibold">
                Total Batches
              </h5>
              <h5 className="text-4xl text-primary font-bold">67</h5>
            </div>
            <Icon
              icon="material-symbols:supervised-user-circle"
              height={50}
              className="text-textSecondary/50 self-end"
            />
          </div>
          <div className="">
            <div className="w-full h-60">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoldBatches;
