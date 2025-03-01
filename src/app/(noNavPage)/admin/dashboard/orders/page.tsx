"use client";
import React, { useState, useEffect } from "react";
import ChartFiltersPanel from "../../components/ChartFiltersPanel";
import useFetchOrderForCharts from "../../hooks/orders/useFetchgetOrderForCharts";
import LineChartComponent from "../../components/charts/LineChartComponent";
import { useTheme } from "@/app/context/themeContext";
import PieChartComponent from "../../components/charts/PieChartComponent";
import RadialBarChartComponents from "../../components/charts/RadialBarChartComponents";
import TotalBox from "../components/totalBox";

function orderCharts() {
  const { themeColors } = useTheme();
  const [interval, setInterval] = useState<string>("weekly");
  const [tempInterval, setTempInterval] = useState<string>(interval);
  const [startDate, setStartDate] = useState<Date>(() => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date;
  });

  const [endDate, setEndDate] = useState<Date>(new Date());
  const [tempStartDate, setTempStartDate] = useState<Date>(startDate);
  const [tempEndDate, setTempEndDate] = useState<Date>(endDate);
  const [chartKeys, setChartKeys] = useState<string[]>(["totalOrders"]);
  const [errMessages, setErrMessages] = useState("");

  const colorsPie = ["#82ca9d", "#8884d8", "#ffc658", "#ff7300"];

  const checkIntervalLength = (): boolean => {
    const maxEndDate = new Date(tempStartDate);
    let errorMessage = "";

    if (tempInterval === "daily") {
      maxEndDate.setMonth(maxEndDate.getMonth() + 1);
      if (tempEndDate > maxEndDate) {
        errorMessage = "The end date exceeds the maximum limit of 1 month for the daily interval.";
      }
    } else if (tempInterval === "weekly") {
      maxEndDate.setMonth(maxEndDate.getMonth() + 6);
      if (tempEndDate > maxEndDate) {
        errorMessage = "The end date exceeds the maximum limit of 6 months for the weekly interval.";
      }
    } else if (tempInterval === "monthly") {
      maxEndDate.setFullYear(maxEndDate.getFullYear() + 2);
      if (tempEndDate > maxEndDate) {
        errorMessage = "The end date exceeds the maximum limit of 2 years for the monthly interval.";
      }
    }

    setErrMessages(errorMessage);
    return errorMessage === "";
  };
  useEffect(() => {
    if (errMessages) {
      checkIntervalLength();
    }
  }, [tempEndDate, tempStartDate, tempInterval, errMessages]);
  

  const handleConfirm = () => {
    const isValid = checkIntervalLength(); 
    if (!isValid) {
      return; 
    }
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setInterval(tempInterval);

    console.log(`✅ Confirmed! startDate: ${tempStartDate}, endDate: ${tempEndDate}, interval: ${tempInterval}`);
  };

  const { chartsData, total, comparativeGrowth, loading, error } = useFetchOrderForCharts(interval, startDate, endDate);
  const pieChartsData = chartKeys.map((key, index) => ({
    name: key,
    value: total[key as keyof typeof total] || 0,
    color: colorsPie[index % colorsPie.length],
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const getChartKeys = () => {
    if (chartsData.length > 0) {
      return Object.keys(chartsData[0]).filter((key) => key !== "label");
    }
    return [];
  };
  const options = getChartKeys();
  console.log("options", options);

  const intervalTitleMap: Record<string, string> = {
    daily: "Last Day-over-Day Growth (DoD)",
    weekly: "Last Week-over-Week Growth (WoW)",
    monthly: "Last Month-over-Month Growth (MoM)",
  };
  const title = intervalTitleMap[interval] || "Order Growth Comparison";

  return (
    <div className='min--screen w-full'
      style={{ backgroundColor: themeColors.bg }}
    >
      <div className='w-full border border-gray-300 flex flex-row gap-5 p-2 px-5 items-center my-7 '
        style={{ backgroundColor: themeColors.base }}
      >
        <ChartFiltersPanel
          interval={tempInterval}
          setInterval={setTempInterval}
          startDate={tempStartDate}
          setStartDate={setTempStartDate}
          endDate={tempEndDate}
          setEndDate={setTempEndDate}
          handleConfirm={handleConfirm}
          chartKeys={chartKeys} 
          setChartKeys={setChartKeys}
          options={options}
          errMessages={errMessages}
          multiSelect={true}
        />
      </div>
      <TotalBox 
        headerText="Total Orders"
        amount={Object.entries(total).reduce((acc, [key, value]) => {
          if (chartKeys.includes(key)) {
            return acc + (typeof value === "number" ? value : 0);
          }
          return acc;
        }, 0)}
        
        unit="orders"
        startDate={startDate}
        endDate={endDate}
        includes={chartKeys}
      />
      <div>
        <div className=' mx-7 p-5 flex flex-col'>
          <div className='p-5  border border-gray-300' style={{ backgroundColor: themeColors.base }}>
            <LineChartComponent data={chartsData} chartKeys={chartKeys} />
          </div>
          <div className='flex flex-row justify-between mt-7 sm:flex-col md:flex-row '>

            <div className='flex flex-col items-center p-1 border border-gray-300 w-full mb-7 mr-7' style={{ backgroundColor: themeColors.base }}>
              <div className='flex justify-center items-center text-lg font-bold py-4 border-b w-full mb-3 '>Order Status Summary</div>
              <PieChartComponent data={pieChartsData} dataKey="value" />
            </div>
            <div className=' flex flex-col items-center p-1 border border-gray-300 w-full mb-7' style={{ backgroundColor: themeColors.base }}>
              <div className='flex justify-center items-center text-lg font-bold py-4 border-b w-full mb-3'>
                {title}
              </div>
              <div className="grid grid-cols-2 sm-grid-cols-1 gap-4 w-full ">
                {Object.entries(comparativeGrowth)
                  .filter(([key]) => chartKeys.includes(key))
                  .map(([key, value], index) => (
                    <div
                      key={index}
                      className=" flex flex-col items-center p-2"
                    >
                      <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                      <div>
                        <RadialBarChartComponents value={Number((value * 100).toFixed(2))} color={colorsPie[0]} />
                      </div>
                    </div>
                  ))}

              </div>
            </div>

          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default orderCharts;