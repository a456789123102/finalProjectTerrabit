"use client";
import { useState, useEffect, useCallback } from "react";
import ChartFiltersPanel from "../../components/ChartFiltersPanel";
import LineChartComponent from "../../components/charts/LineChartComponent";
import { useTheme } from "@/app/context/themeContext";
import useFetchUsersForCharts from "../../hooks/users/useFetchUsersForCharts";
import TotalBox from "../components/totalBox";

function IncomeCharts() {
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
    const [chartKeys, setChartKeys] = useState<string[]>(["activeUsers"]);
    const [errMessages, setErrMessages] = useState("");


    const checkIntervalLength = useCallback((): boolean => {
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
    },[tempStartDate, tempEndDate, tempInterval]);
    useEffect(() => {
        checkIntervalLength()
        console.log("error msg: " + errMessages)
    }, [tempEndDate, tempStartDate, tempInterval,checkIntervalLength,errMessages])



    const handleConfirm = () => {
        const isValid = checkIntervalLength();
        if (!isValid) {
            return;
        }
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);
        setInterval(tempInterval);

        console.log(` Confirmed! startDate: ${tempStartDate}, endDate: ${tempEndDate}, interval: ${tempInterval}`);
    };

    const { chartsData, totalActiveUsers, totalInactiveUsers, loading, error } = useFetchUsersForCharts(interval, startDate, endDate);



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
        amount={chartKeys.reduce((acc, key) => {
            if (key === "activeUsers") return acc + totalActiveUsers;
            if (key === "inactiveUsers") return acc + totalInactiveUsers;
            return acc;
          }, 0)}
          
        unit="users"
        startDate={startDate}
        endDate={endDate}
        includes={chartKeys}
      />
            <div>
                <div className=' mx-7 p-5 flex flex-col'>
                    <div className='p-5  border border-gray-300' style={{ backgroundColor: themeColors.base }}>
                        <LineChartComponent data={chartsData} chartKeys={chartKeys} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IncomeCharts;