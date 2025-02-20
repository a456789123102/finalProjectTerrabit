import React from 'react'
import useFetchgetYearlySalesForCharts from '../../hooks/orders/useFetchgetYearlySalesForCharts'
import { useTheme } from "@/app/context/themeContext";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Number from "@/app/components/Number";

function SalesChartsBox() {
    const { theme, themeColors } = useTheme();
    const { chartsData, totalOrders, totalSales, totalItemsSales } = useFetchgetYearlySalesForCharts();
    const mapData = [
        { key: "totalSales", value: totalSales },
        { key: "totalOrders", value: totalOrders },
        { key: "totalItemsSales", value: totalItemsSales }
    ];
    return (
        <div className="rounded-[4px] lg:col-span-2 border border-gray-300" style={{ backgroundColor: themeColors.base }}>
            <div className="p-3 border-b border-gray-300 font-medium text-[1.3rem]">OVERVIEW ORDER AND INCOMES</div>
            <div className="p-4">
                <div className="flex flex-row justify-around">
                    {mapData.map((data, index) => (
                        <div key={index}>
                            <div className="text-0.9rem ">{data.key}</div>
                            <div className="flex flex-row items-baseline gap-1">
                                <div className="text-[1.4rem]">{data.value.thisYear}</div>
                                {data.value.compareGrowth < 0 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-3 text-red-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-3 text-green-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                    </svg>}
                                <div className={`${data.value.compareGrowth > 0 ? "text-green-400" : "text-red-400"} text-[0.8rem] flex flex-row`}><Number>{data.value.compareGrowth * 100}</Number> %</div>
                                <div className="text-gray-400 text-[0.8rem]">last year</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-40 mt-4 border border-gray-300" style={{ backgroundColor: themeColors.bg, borderRadius: "4px", padding: "10px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartsData}
                            margin={{
                                top: 10,
                                right: 20,
                                left: -10,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="2 2" strokeOpacity={0.5} />
                            <XAxis dataKey="label" tick={{ fontSize: 10, fill: themeColors.text }} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: themeColors.text }} tickLine={false} />
                            <Tooltip
                                contentStyle={{ color: themeColors.secondary }} 
                            />

                            <Area type="monotone" dataKey="thisYearSales" stackId="1" stroke="#8884d8" fill="rgba(136, 132, 216, 0.5)" />
                            <Area type="monotone" dataKey="lastYearSales" stackId="1" stroke="#82ca9d" fill="rgba(130, 202, 157, 0.5)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    )
}

export default SalesChartsBox