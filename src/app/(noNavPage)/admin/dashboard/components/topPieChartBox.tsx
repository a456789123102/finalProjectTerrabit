import React from "react";
import { useTheme } from "@/app/context/themeContext";
import AreaChartNogridComponent from "../../components/charts/AreaChartNogridComponent";

type TopPieChartBoxProps = {
  headerText: string;
  amount: number;
  wow: number;
  chartsData: object[]; // ✅ เปลี่ยนจาก string[] เป็น object[]
  keyData: string;
  color: string;
};


const TopPieChartBox: React.FC<TopPieChartBoxProps> = ({ chartsData, keyData, headerText, amount, wow, color }) => {
  const { theme, themeColors } = useTheme();
  const newAmount = Number(amount.toFixed(0)).toLocaleString();
  const newWow = `${(wow * 100).toFixed(2)}%`;
  return (
    <div className=" border flex flex-col border-gray-300 h-36 relative" style={{ backgroundColor: themeColors.base }}>
      <div className="p-4">
        <div>{headerText}</div>
        <div className="flex flex-row flex-wrap items-baseline gap-2">
          <div className="text-[1.4rem]">{newAmount}</div>
          <div className={`text-[0.75rem] flex flex-row items-baseline gap-1 ${wow < 0 ? "text-red-400" : "text-green-400"}`}>
            {wow < 0 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
              : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>}

            <div>{newWow}</div>
          </div>
          <div className="text-[0.75rem] text-gray-400">since last week</div>
        </div>
      </div>
      <div className="w-full absolute bottom-0" >
        <AreaChartNogridComponent
          data={chartsData}
          keyData={keyData}
          color={color}
        />
      </div>
    </div>
  );
};

export default TopPieChartBox;
