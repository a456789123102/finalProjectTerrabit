import React from "react";
import { useTheme } from "@/app/context/themeContext";

interface TotalBoxProps {
  headerText: string;
  amount: number | string;
  unit?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  includes?: string[];
}

const TotalBox: React.FC<TotalBoxProps> = ({ headerText, amount, unit, startDate, endDate, includes }) => {
  const { themeColors } = useTheme();

  console.log("Includes:", includes);

  const formatDate = (date?: Date | string) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(new Date(date));
  };

  return (
    <div className="border flex flex-col border-gray-300" style={{ backgroundColor: themeColors.base }}>
      <div className="p-4 px-12">
        <div className="text-[1.2rem]">{headerText}</div>
        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap items-baseline gap-2">
            <div className="text-[1.4rem]" style={{ color: themeColors.hoverText }}>
              {amount}
            </div>
            {unit && <div className="text-[0.9rem]">{unit}</div>}
          </div>
          <div className="flex flex-row gap-2 text-[0.75rem] text-gray-400">
            <div>
              {formatDate(startDate)} - {formatDate(endDate)}
            </div>
            {includes && includes.length > 0 && (
              <div className="flex flex-row gap-1">
                Includes: {includes.join(" / ")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalBox;
