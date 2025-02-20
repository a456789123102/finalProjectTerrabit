import React from 'react';
import { useTheme } from "@/app/context/themeContext";
import useFetchTopSellerForCharts from "../../hooks/orders/useFetchTopSellerForCharts"; 
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function TopSellerBox() {
  const { themeColors } = useTheme();
  const { chartsData, loading, error } = useFetchTopSellerForCharts(undefined, undefined, undefined, undefined, 20);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="col-span-4   border border-gray-300 rounded-[4px]" style={{ backgroundColor: themeColors.base}}>
      <div className="p-3 border-b border-gray-300 font-medium text-[1.3rem]">TOP SELLING PRODUCTS</div>
      <div className="m-4 mt-10 border border-gray-300" style={{ backgroundColor: themeColors.bg, borderRadius: "4px", padding: "10px" }}>
  <ResponsiveContainer width="100%" height={400}>
  <BarChart data={chartsData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
    {/* Grid เส้นแนว Guide */}
    <CartesianGrid strokeDasharray="3 3" />

    <XAxis 
  dataKey="label" 
  angle={-25} 
  interval={0} 
  tick={{ fontSize: 10, fill: themeColors.text }} 
  stroke="transparent" 
  strokeWidth={0} 
  label={{ position: "top" }} 
  style={{ pointerEvents: "none" }} 
  tickFormatter={(value) => 
    value.length > 10 ? `${value.substring(0, 10)}...` : value
  } 
/>


    <YAxis />

    <Tooltip />

    <Legend verticalAlign="top" />

    {/* Bar Chart (ให้ Bar โปร่งแสง) */}
    <Bar 
  dataKey="quantity" 
  fill="#8884d8" 
  fillOpacity={0.8} 
  stroke="#8884d8"   
  strokeWidth={2}   
  name="Selling Amount" 
/>

  </BarChart>
</ResponsiveContainer>

  </div>
    </div>
  );
}

export default TopSellerBox;
