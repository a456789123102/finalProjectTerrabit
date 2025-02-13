import React, { useRef, useEffect, useState } from "react";
import { AreaChart, Area, Tooltip, XAxis, YAxis } from "recharts";

const AreaChartNogridComponent = ({ data, keyData, color }) => {
  const chartContainerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(200);

  useEffect(() => {
    const updateChartSize = () => {
      if (chartContainerRef.current) {
        setChartWidth(chartContainerRef.current.clientWidth);
      }
    };

    updateChartSize();
    window.addEventListener("resize", updateChartSize);
    return () => window.removeEventListener("resize", updateChartSize);
  }, []);

  // ✅ ตรวจสอบว่า data มีค่า totalOrders จริงหรือไม่
  console.log("Chart Data: ", data);

  return (
    <div ref={chartContainerRef} className="w-full overflow-hidden">
      <AreaChart width={chartWidth} height={55} data={data}> //use 80 to shows info
        <defs>
          <linearGradient id={`color${keyData}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* ✅ เพิ่มแกน X ให้แสดง label */}

        <Tooltip formatter={(value, name) => [`${value.toLocaleString()}`, name]} />
        <Area
          type="linear"
          dataKey={keyData} // ต้องเป็น "totalOrders"
          stroke={color}
          fillOpacity={1}
          fill={`url(#color${keyData})`}
        />
      </AreaChart>
    </div>
  );
};

export default AreaChartNogridComponent;
