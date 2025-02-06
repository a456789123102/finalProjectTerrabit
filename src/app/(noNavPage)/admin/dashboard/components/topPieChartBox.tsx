import React from "react";
import { useTheme } from "@/app/context/themeContext";

type TopPieChartBoxProps = {
  headerText: string;
  amount: number;
  wow: number;
  chartsData :string[];
};

const TopPieChartBox: React.FC<TopPieChartBoxProps> = ({ chartsData,keyChartsData,headerText, amount, wow }) => {
  const { theme, themeColors } = useTheme();

  return (
    <div className="p-4 border flex flex-col border-gray-300" style={{ backgroundColor: themeColors.primary }}>
      <div>{headerText}</div>
      <div className="flex flex-row flex-wrap items-baseline gap-1">
        <div className="text-[1.4rem]">{amount}</div>
        <div className={`text-[0.75rem] ${wow < 0 ? "text-red-400" : "text-green-400"}`}>{wow * 100} %</div>
        <div className="text-[0.75rem] text-gray-400">since last week</div>
      </div>
    </div>
  );
};

export default TopPieChartBox;
