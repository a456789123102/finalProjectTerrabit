import React, { useState } from "react";
import DateRangePicker from "./DateRangePicker";
import IntervalDropdown from "./intervalDropdown";
import ChartKeysDropDown from "./ChartKeysDropDown";

const ChartFiltersPanel = ({ interval, setInterval, startDate, setStartDate, endDate, setEndDate, handleConfirm, chartKeys, setChartKeys, options }) => {


  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-row gap-5 items-center">
        <div>
          <DateRangePicker
            startDate={startDate}
            onStartDateChange={setStartDate}
            endDate={endDate}
            onEndDateChange={setEndDate}
          />
        </div >
        <div className='w-36'>
          <IntervalDropdown
            interval={interval}
            setInterval={setInterval}
          />
        </div>
        <div className='max-h-10 '>
          <ChartKeysDropDown
            chartKeys={chartKeys}
            setChartKeys={setChartKeys}
            options={options}
          />
        </div>
      </div>
      <button className='bg-gray-300 p-2 hover:bg-gray-500 mx-2' onClick={handleConfirm}>Confirm</button>
    </div>

  );
};

export default ChartFiltersPanel;
