import Image from "next/image";
import Link from "next/link";
import Logo from "@assets/logo/logo.svg";
import { Icon } from "@iconify/react";
import Button from "@/ui/Button/Button";
import Sidebar from "@/features/ui/Sidebar/Sidebar";
import { use, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Batch } from "@/types";
import { firebaseDateToDate, firebaseDateToTime } from "@/utils";
import InventorySidebar from "@/features/ui/InventorySidebar/InventorySidebar";
const Inventory = () => {
  const [batches, setBatches] = useState<Array<Batch> | null>(null);
  const [loading, setLoading] = useState(false);
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

  const getBatches = useCallback(async () => {
    await axios
      .get("http://localhost:8080/api/user/batches", { withCredentials: true })
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
          <h1 className="text-primary text-3xl font-bold">Inventory</h1>
          <div className="p-5 ">
            <table className="w-full ">
              <thead className="text-primary font-semibold text-xl">
                <tr>
                  <td>Date</td>
                  <td>Time</td>
                  <td>BatchID</td>
                  <td>Batch Size</td>
                  {/* <td>Distributor</td> */}
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {batches
                  ? batches.map((batch: Batch, index) => (
                      <tr className="border-b   " key={batch.batchId}>
                        <td className="py-2">
                          {firebaseDateToDate(batch.createdAt)}
                        </td>
                        <td>{firebaseDateToTime(batch.createdAt)}</td>
                        <td>{batch.batchId}</td>
                        <td>{batch.batchSize}</td>
                        {/* <td>{}</td> */}
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      <InventorySidebar/>
      </div>
    </div>
  );
};

export default Inventory;
