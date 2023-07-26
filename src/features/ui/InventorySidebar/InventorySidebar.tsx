import { Icon } from "@iconify/react";
import Image from "next/image";
import PieChart from "@/features/ui/PieChart/PieChart";
import ChickenIcon from "@assets/Images/chicken-icon.svg";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { firebaseDateToDate } from "@/utils";
import { useCookies } from "react-cookie";

const InventorySidebar = () => {
    const [cookies] = useCookies(["user"]);
    const[data,setData]=useState<any|undefined>(undefined)
    const[chartData,setChartData]=useState<any|undefined>(undefined)
    const getDashboardData = useCallback(() => {
        axios
          .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/total-batches-generated-and-sold`, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            setData(res.data);
            let t = res.data.soldBatches.reduce((result:any, d:any) => {
                result[d.distributorId] =
                  result[d.distributorId] != undefined
                    ? ++result[d.distributorId]
                    : 0;
      
                return result;
              }, {});
            setChartData(
              Object.keys(t).map((key) => ({ outletId: key, value: t[key] }))
            );
            // setLoading(false);
            // setCurrentUser(cookies["user"]);
            // console.log(cookies["user"]);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [cookies]);
      useEffect(() => {
        getDashboardData();
      }, []);
    return (
        <div className="bg-white h-full rounded-xl w-[25%] p-5 space-y-4">
        <h1 className="text-primary text-xl font-bold">Market Summary</h1>
        <div className="bg-secondary rounded-xl p-4 flex justify-between">
          <div className="">
            <h5 className="text-textSecondary/75 font-semibold">
              Total Chickens
            </h5>
            <h5 className="text-4xl text-primary font-bold">{data?data.totalChickensSold:0}</h5>
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
            <h5 className="text-4xl text-primary font-bold">{data?data.totalBatchesGenerated:0}</h5>
          </div>
          <Icon
            icon="material-symbols:supervised-user-circle"
            height={50}
            className="text-textSecondary/50 self-end"
          />
        </div>
        <div className="">
          <div className="w-full h-60">
            {<PieChart data={chartData?chartData:[]}/>}
          </div>
        </div>
      </div>
    );
}

export default InventorySidebar;