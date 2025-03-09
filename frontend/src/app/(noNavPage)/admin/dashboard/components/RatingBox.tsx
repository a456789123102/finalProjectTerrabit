import React from 'react'
import { useTheme } from "@/app/context/themeContext";
import UseFetchWeeklyRatingForCharts from '../../hooks/reviews/UseFetchWeeklyRatingForCharts';
import { PieChart, Pie, Cell } from "recharts";

function RatingBox() {
  const { theme, themeColors } = useTheme();
  const{ totalRating,lastWowRatings ,totalReviewer} = UseFetchWeeklyRatingForCharts();
 
  const data = [
    { name: "Progress", value: totalRating, fill: totalRating > 2 ? "#AFE1AF" :"#C70039"},
    { name: "Empty", value: 5 - totalRating, fill: "#E0E0E0" }
  ];
  return (
<div className="border rounded-[4px]  border-gray-300" style={{ backgroundColor: themeColors.base }}>
  <div className="p-3 border-b border-gray-300 font-medium text-[1.3rem]">TOTAL RATINGS</div>
  <div className="flex flex-row gap-1 items-center p-4">
    <div className="flex flex-col">
      <div className="text-[1rem] font-medium">AVERAGE RATING</div>
      <div className="flex flex-row gap-1 items-baseline">
        <div className='flex flex-row text-[1.4rem] font-bold items-baseline'>
        {lastWowRatings < 0 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5 text-red-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5 text-green-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                    </svg>}
        <div className="">{Math.round(lastWowRatings * 10000) / 100} %</div>
        </div>
        <div className="text-[0.75rem] text-red-500">This Week</div>
      </div>
      <div className="text-[0.6rem] text-gray-500">
      This rating reflects the feedback from users who have purchased and reviewed the product over the past week, compared to the average rating from the previous period.
      </div>
    </div>
    {/* charts */}
    <div className="relative flex justify-center items-center">
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={70}
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>

      {/* ✅ แสดงค่าตรงกลาง */}
      <div className="absolute text-center">
        <span className="text-2xl font-bold">{Math.round(totalRating * 10) / 10} / 5</span>
        <div className="text-sm text-gray-500">Overall Score</div>
      </div>
    </div>
  </div>
</div>

  )
}

export default RatingBox