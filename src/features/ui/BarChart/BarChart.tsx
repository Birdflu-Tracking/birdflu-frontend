import React, { PureComponent } from "react";
import {
  BarChart as BC,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";



export default function BarChart({data}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BC width={150} height={40} data={data}>
        <Bar
          dataKey="value"
          fill="#993E3A"
          opacity={0.3}
          radius={100}
          barSize={50}
          label={{
            position: "center",
            angle: -90,
            fill: "#993E3A",
            offset: 25,
          }}
        >
        {/* <Tooltip /> */}
        {/* <XAxis dataKey={"sold"}/> */}
          {/* <LabelList dataKey="uv" />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}{" "} */}
        </Bar>
      </BC>
    </ResponsiveContainer>
  );
}
// const CustomizedTooltip = ({ active, payload, label }) => {
//   console.log(active, payload, label);

//   if (active) {
//     return (
//       <div className="chart-tooltip">
//         <div className="">
//           <span>Original: {payload[0].Date}</span>
//           <span>{payload[0].payload.sold}</span>
//         </div>

//       </div>
//     );
//   }

//   return null;
// };
