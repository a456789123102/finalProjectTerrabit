"use client"
import React, { useState } from 'react'
import ChartFiltersPanel from '../../components/ChartFiltersPanel';
import useFetchOrderForCharts from '../../hooks/orders/useFetchgetOrderForCharts';
import LineChartComponent from '../../components/charts/LineChartComponent';
import IntervalDropdown from '../../components/intervalDropdown';

function orderCharts() {
      const [interval, setInterval] = useState<string>("monthly");
      const [tempInterval, setTempInterval] = useState<string >(interval);
      const [startDate, setStartDate] = useState<Date>(
        new Date(new Date()) // วันแรกของปี
      );
      const [endDate, setEndDate] = useState<Date>(() => {
        let date = new Date(); // วันที่ปัจจุบัน
        date.setMonth(date.getMonth() + 1); // เพิ่ม 1 เดือน
        return new Date(date); // ใช้ new Date() ห่ออีกครั้งให้เป็น Date object
      });
      const [tempStartDate, setTempStartDate] = useState<Date>(
     startDate
      );
      const [tempEndDate, setTempEndDate] = useState<Date>(
        endDate
         );
         const [chartKeys, setChartKeys] = useState<string[]>(["totalOrders"]);
         const [tempChartKeys, setTempChartKeys] = useState<string[]>(["totalOrders"]);



        const handleConfirm = () => {
          setStartDate(tempStartDate);
          setEndDate(tempEndDate);
          setInterval(tempInterval);
          setChartKeys(tempChartKeys);
          console.log(`startDate: ${startDate} endDate: ${endDate} interval:${interval}`)
          console.log("chartKeys after confirm:", tempChartKeys); // เพิ่มบรรทัดนี้
        }
      
      const chartsData = useFetchOrderForCharts(interval,startDate,endDate);
      console.log("chartData", chartsData);

      const getChartKeys = () => {
        if (chartsData.length > 0) {
          return Object.keys(chartsData[0]).filter(key => key !== "label");
        }
        return [];
      };
      const options = getChartKeys();
      console.log("options", options);
      
      
  return (
    <div className='h-full w-full p-5 '>
        <div>head</div>
        <div className='w-full border flex flex-row gap-5 p-2 items-center'>
        <ChartFiltersPanel
  interval={tempInterval}
  setInterval={setTempInterval}
  startDate={tempStartDate}
  setStartDate={setTempStartDate}
  endDate={tempEndDate}
  setEndDate={setTempEndDate}
  handleConfirm={handleConfirm}
  chartKeys={tempChartKeys} // ตรวจสอบว่า tempChartKeys ไม่เป็น undefined
  setChartKeys={setTempChartKeys}
  options={options}
/>
        </div>
        <div>
            <div className='border'>
            <LineChartComponent data={chartsData} chartKeys={chartKeys}/>
            </div>
  
        </div>
    </div>
  )
}

export default orderCharts;