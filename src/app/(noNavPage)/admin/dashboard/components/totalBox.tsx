import React from "react";
import { useTheme } from "@/app/context/themeContext";

function TotalBox({ headerText, amount, unit, startDate, endDate, includes }) {
  const { themeColors } = useTheme();
console.log("include",includes)
  // ✅ แสดงวันที่ในรูปแบบอ่านง่าย
  const formatDate = (date) => new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(date);

  return (
    <div className="border flex flex-col border-gray-300" style={{ backgroundColor: themeColors.base }}>
      <div className="p-4 px-12">
        <div className="text-[1.2rem]">{headerText}</div>
        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap items-baseline gap-2">
            <div className="text-[1.4rem]" style={{color:themeColors.hoverText}}>{amount}</div>
            <div className="text-[0.9rem]">{unit}</div>
          </div>
          <div className="flex flex-row gap-2 text-[0.75rem] text-gray-400">
            <div className="">
              {formatDate(startDate)} - {formatDate(endDate)}
            </div>
            <div className="flex flex-row gap-1">
  Includes: {includes?.join(" / ")}
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalBox;
