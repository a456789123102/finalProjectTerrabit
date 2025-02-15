import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface PieProgressProps {
  value: number; // ค่าความก้าวหน้า 0 - 100 (%)
  color?: string; // สีของ Progress
}

const PieProgress: React.FC<PieProgressProps> = ({ value }) => {
  const safeValue = Math.min(100, Math.max(0, Math.abs(value))); 
  
  const data = [
    { name: "Progress", value: safeValue, fill: value > 0 ? "#AFE1AF" :"#C70039"},
    { name: "Empty", value: 100 - safeValue, fill: "#E0E0E0" }
  ];
  

  return (
    <div className="relative flex justify-center items-center">
      {/* ✅ Pie Chart */}
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={50} // ✅ วงในของ Doughnut Chart
          outerRadius={70} // ✅ ความกว้างของ Doughnut
          startAngle={90} // ✅ ให้เริ่มจากด้านบน
          endAngle={-270} // ✅ หมุนแบบเดียวกับ RadialBarChart
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>

      {/* ✅ แสดงค่าตรงกลาง */}
      <div className="absolute text-center">
        <span className={`text-2xl font-bold`}>{value}%</span>
        <div className="text-sm">Growth</div>
      </div>
    </div>
  );
};

export default PieProgress;
