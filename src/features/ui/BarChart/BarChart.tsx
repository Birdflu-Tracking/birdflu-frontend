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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function BarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BC width={150}  data={data}>
        <Bar
          dataKey="uv"
          fill="#993E3A"
          opacity={0.2}
          radius={100}
          barSize={50}
          label={{
            position: "center",
            angle: -90,
            fill: "#993E3A",
            offset: 25,
          }}
        >
          {/* <LabelList dataKey="uv" />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}{" "} */}
        </Bar>
      </BC>
    </ResponsiveContainer>
  );
}
const CustomizedTooltip = ({ active, payload, label }) => {
  console.log(active, payload, label);

  if (active) {
    return (
      <div className="chart-tooltip">
        <div className="">
          <span>Original: {payload[0].name}</span>
          <span>{payload[0].payload.call_time}</span>
        </div>
        <div className="">
          <span>Compared</span>
        </div>
      </div>
    );
  }

  return null;
};
