import React, { useRef, useEffect, useState } from "react";
import { AreaChart, Area, Tooltip } from "recharts";

const AreaChartNogridComponent = ({ data, keyData, color }) => {
  const chartContainerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(200); // ตั้งค่าเริ่มต้น

  useEffect(() => {
    const updateChartSize = () => {
      if (chartContainerRef.current) {
        setChartWidth(chartContainerRef.current.clientWidth); 
      }
    };

    updateChartSize(); // อัพเดตขนาดตอนแรก
    window.addEventListener("resize", updateChartSize); // ฟังชันอัพเดตเมื่อหน้าจอเปลี่ยนขนาด
    return () => window.removeEventListener("resize", updateChartSize);
  }, []);

  return (
    <div ref={chartContainerRef} className="w-full overflow-hidden">
      <AreaChart width={chartWidth} height={52} data={data}>
        <defs>
          <linearGradient id={`color${keyData}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip />
        <Area
          type="linear"
          dataKey={String(keyData)}
          stroke={color}
          fillOpacity={1}
          fill={`url(#color${keyData})`}
        />
      </AreaChart>
    </div>
  );
};

export default AreaChartNogridComponent;
