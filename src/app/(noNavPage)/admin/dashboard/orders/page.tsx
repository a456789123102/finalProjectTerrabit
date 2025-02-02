"use client"
import React, { useState } from 'react'
import ChartFiltersPanel from '../../components/ChartFiltersPanel';
import useFetchOrderForCharts from '../../hooks/orders/useFetchgetOrderForCharts';
import LineChartComponent from '../../components/charts/LineChartComponent';
import IntervalDropdown from './components/intervalDropdown';

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


        const handleConfirm = () => {
          setStartDate(tempStartDate);
          setEndDate(tempEndDate);
          setInterval(tempInterval);
          console.log(`startDate: ${startDate} endDate: ${endDate} interval:${interval}`)
        }

      
      
      const chartsData = useFetchOrderForCharts(interval,startDate,endDate);
      console.log("chartData", chartsData);
  return (
    <div className='h-full w-full p-5 '>
        <div>head</div>
        <div className='w-full border flex flex-row gap-5 p-2 items-center'>
            <ChartFiltersPanel
            interval={interval}
            setInterval={setInterval}
            startDate={tempStartDate}
            setStartDate={setTempStartDate}
            endDate={tempEndDate}
            setEndDate={setTempEndDate}
            />
            <div className='w-36'>
              <IntervalDropdown 
              interval={tempInterval}
              setInterval={setTempInterval}
              />
            </div>
<button className='bg-gray-300 p-2 hover:bg-gray-500' onClick={handleConfirm}>Confirm</button>
        </div>
        <div>
            <div className='m-5 border p-1'>
            <LineChartComponent data={chartsData} />
            </div>
  
        </div>
    </div>
  )
}

export default orderCharts;