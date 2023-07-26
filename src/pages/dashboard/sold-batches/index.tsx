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
import { BatchWithBuyer, User } from "@/types";
import { firebaseDateToDate, firebaseDateToTime } from "@/utils";
import { useCookies } from "react-cookie";
import InventorySidebar from "@/features/ui/InventorySidebar/InventorySidebar";

const SoldBatches = () => {
  const [batches, setBatches] = useState<Array<BatchWithBuyer> | null>(null);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["user"]);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

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
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/sold-batches`, {
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
    setCurrentUser(cookies["user"]);
  }, [getBatches, cookies]);

  return (
    <div className="flex w-screen h-screen bg-secondary ">
      {/* Sidebar */}
      <Sidebar
        links={
          cookies.user.type == "distributor"
            ? links.filter((d) => d.path != "/dashboard/sample-requests")
            : links
        }
      />
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
                  {currentUser ? (
                    currentUser.type == "farmer" ? (
                      <td>Distributor</td>
                    ) : (
                      <td>Seller</td>
                    )
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {batches ? (
                  batches.map((batch: BatchWithBuyer, index) => (
                    <tr className="border-b   " key={batch.batchId}>
                      <td className="py-2">
                        {firebaseDateToDate(batch.createdAt)}
                      </td>
                      <td>{firebaseDateToTime(batch.createdAt)}</td>
                      <td>{batch.batchId}</td>
                      <td>{batch.batchSize}</td>
                      <td>
                        {batch.buyer
                          ? batch.buyer.outletName
                          : "User not found"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No Batches</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <InventorySidebar />
      </div>
    </div>
  );
};

export default SoldBatches;
