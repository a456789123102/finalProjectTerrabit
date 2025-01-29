"use client"
import React, { useState } from 'react'
import ChartFiltersPanel from '../../components/ChartFiltersPanel';
import useFetchOrderForCharts from '../../hooks/orders/useFetchgetOrderForCharts';

function orderCharts() {
      const [interval, setInterval] = useState<string>("monthly");
      const [startDate, setStartDate] = useState<Date>(
        new Date(new Date().getFullYear(), 0, 1) // วันแรกของปี
      );
      
      const [endDate, setEndDate] = useState<Date>(
        new Date(new Date().getFullYear(), 11, 31) // วันสุดท้ายของปี
      );
      
      const chartsData = useFetchOrderForCharts(interval,startDate,endDate);
      console.log("chartData", chartsData);
  return (
    <div className='h-full w-full p-5'>
        <div>head</div>
        <div className='w-full border flex flex-row gap-5 p-2 items-center'>
            <ChartFiltersPanel
            interval={interval}
            setInterval={setInterval}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            />
<button className='bg-gray-300 p-2 hover:bg-gray-500'>Confirm</button>
        </div>
        <div>
            <div>charts</div>
  
        </div>
    </div>
  )
}

export default orderCharts;