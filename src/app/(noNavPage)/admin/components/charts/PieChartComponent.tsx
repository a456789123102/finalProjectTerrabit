import React from 'react';
import { Pie, PieChart, Tooltip, Legend, Cell } from 'recharts';

interface PieChartComponentProps {
  data: { name: string; value: number; color: string }[];
  dataKey: string;
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data, dataKey }) => {
    console.log("DATA: ",data)
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey={dataKey}
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
        {/* 🔹 ใช้ Cell เพื่อกำหนดสีให้แต่ละชิ้นของ Pie */}
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
