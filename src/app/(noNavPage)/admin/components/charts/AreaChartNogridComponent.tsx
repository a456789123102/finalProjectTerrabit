import React, { useRef, useEffect, useState } from "react";
import { AreaChart, Area, Tooltip } from "recharts";

interface ChartData {
  [key: string]: number | string;
}

interface AreaChartNogridComponentProps {
  data: ChartData[];
  keyData: string;
  color: string;
}

const AreaChartNogridComponent: React.FC<AreaChartNogridComponentProps> = ({ data, keyData, color }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [chartWidth, setChartWidth] = useState<number>(200);

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

  return (
    <div ref={chartContainerRef} className="w-full overflow-visible">
      <AreaChart width={chartWidth} height={55} data={data}>
        <defs>
          <linearGradient id={`color${keyData}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        <Tooltip
          formatter={(value: number | string, name: string, props: any) => {
            const label = props.payload?.label ?? "No Label";
            return label !== "No Label" ? [`${value.toLocaleString()}`, `${label}`] : [`${value.toLocaleString()}`, name];
          }}
        />
        
        <Area
          type="linear"
          dataKey={keyData}
          stroke={color}
          fillOpacity={1}
          fill={`url(#color${keyData})`}
        />
      </AreaChart>
    </div>
  );
};

export default AreaChartNogridComponent;
