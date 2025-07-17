import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    _id: "2025-07-13",
    count: 3,
  },
  {
    _id: "2025-07-15",
    count: 1,
  },
];

export default function Analytics() {
  console.log("barchart");
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="count"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
