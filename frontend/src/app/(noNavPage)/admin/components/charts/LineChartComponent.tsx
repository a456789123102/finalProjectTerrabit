import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
interface ChartData {
  [key: string]: number | string | undefined;
}

interface LineChartProps {
  data: ChartData[];
  chartKeys: string[];
}
const LineChartComponent: React.FC<LineChartProps> = ({ data, chartKeys }) => {
console.log(`chartKeys:${chartKeys}`);
  const colors = ["#82ca9d", "#8884d8", "#ffc658", "#ff7300"];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        {chartKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[index % colors.length]} 
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent;