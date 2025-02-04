import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function LineChartComponent({ data, chartKeys }) {
console.log(`chartKeys:${chartKeys}`);
  const colors = ["#82ca9d", "#8884d8", "#ffc658", "#ff7300"];

  return (
    <ResponsiveContainer width="100%" height={300}>
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
            stroke={colors[index % colors.length]} // Cycle through colors if there are more keys than colors
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent;