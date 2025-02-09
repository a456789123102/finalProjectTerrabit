"use client"
import React, { useState } from 'react'
import ChartFiltersPanel from '../../components/ChartFiltersPanel';
import useFetchOrderForCharts from '../../hooks/orders/useFetchgetOrderForCharts';
import LineChartComponent from '../../components/charts/LineChartComponent';
import { useTheme } from '@/app/context/themeContext';

function orderCharts() {
  const { themeColors } = useTheme();
  const [interval, setInterval] = useState<string>("monthly");
  const [tempInterval, setTempInterval] = useState<string>(interval);
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

  const chartsData = useFetchOrderForCharts(interval, startDate, endDate);
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
    <div className='h-screen w-full'
    style={{ backgroundColor: themeColors.primary}}
    >
      <div className='w-full border-y-2 flex flex-row gap-5 p-2 px-5 items-center my-7 '
       style={{ backgroundColor: themeColors.base}}
      >
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
        <div className='border mx-7 p-5 flex flex-col'>
         <div className='p-3' style={{ backgroundColor: themeColors.base}}>
         <LineChartComponent data={chartsData} chartKeys={chartKeys} />
         </div>
          <div className='flex flex-row justify-between mt-7 border'>
            <div>
              <div>Pending Order</div>
              <div>25/100</div>
              <div>25%</div>
            </div>
            <div>Manage</div>
            <div>Manage</div>
            <div>Manage</div>
          </div>
        </div>
<div>
  
</div>
      </div>
    </div>
  )
}

export default orderCharts;