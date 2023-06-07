import { Icon } from "@iconify/react";
import Link from "next/link";
import Logo from "@assets/logo/logo.svg";
import Image from "next/image";
import Button from "@/ui/Button/Button";
import { useCallback, useEffect, useState } from "react";
import { CurrentRequests } from "@/types";
import axios from "axios";

const HealthSidebar = () => {
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
    <div className="bg-white h-full rounded-xl w-[25%] p-5 space-y-4">
      <div className="flex flex-col justify-center items-center p-5 bg-secondary rounded-xl text-primary space-y-4">
        <h3 className=" font-semibold">Chicken Flue Alerts</h3>
        <Icon icon="solar:danger-triangle-linear" height={80} />
        <p className=" text-xs text-center font-medium">
          Increasing reports at farms
        </p>
        <Link href={"/health-dashboard/sample-requests"}>
          <Button
            // onClick={() => settoggle(true)}
            value="Take Action"
            text="text-xs"
          />
        </Link>
      </div>
      {currentRequests?.submitted.length > 0 && currentRequests?.submitted[0].reportData.avianResult?<div className="bg-secondary p-5 rounded-xl  text-primary items-center space-y-2">
        {" "}
        <h2 className="font-semibold">Submitted report ML predictions</h2>
        <div className="flex space-x-2 text-red-600">
          <Icon
            icon="solar:danger-triangle-linear"
            height={80}
            className="text-red-600"
          />
          <div className="space-y-2">
            <p className="text-2xl font-bold">{currentRequests.submitted[0].farmData.outletName}</p>
            <p>ML results Positive for Avian Influenza</p>
            <Link href={"/health-worker/sample-requests"}><button className="bg-red-600 p-2 rounded-full w-full text-white">
              Mark as Affected
            </button>
            </Link>
          </div>
        </div>
      </div>:null}
    </div>
  );
};

export default HealthSidebar;
