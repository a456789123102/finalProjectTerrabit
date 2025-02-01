import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function LineChartComponent({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" /> {/* Fixed: Changed 'name' to 'label' */}
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalOrders" stroke="#82ca9d" /> 
        {/* Ensure `totalOrders` has a 'value' key. If it's a number, use `dataKey="totalOrders"` directly */}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent;
