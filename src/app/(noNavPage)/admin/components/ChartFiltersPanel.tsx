import React, { useState } from "react";
import DateRangePicker from "./DateRangePicker";
import IntervalDropdown from "./intervalDropdown";
import ChartKeysDropDown from "./ChartKeysDropDown";

interface ChartFiltersPanelProps {
  interval: string;
  setInterval: (interval: string) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date; 
  setEndDate: (date: Date) => void; 
  handleConfirm: () => void;
  chartKeys: string[];
  setChartKeys: (keys: string[]) => void;
  options: string[];
  errMessages: string;
  multiSelect: boolean;
}



const ChartFiltersPanel: React.FC<ChartFiltersPanelProps> = ({
  interval,
  setInterval,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleConfirm,
  chartKeys,
  setChartKeys,
  options,
  errMessages,
  multiSelect,
}) => {
  return (
    <div className="flex flex-row justify-between items-center w-full text-[0.9rem]">
      {options.length > 1 && (
        <ChartKeysDropDown
          chartKeys={chartKeys}
          setChartKeys={setChartKeys}
          options={options}
          multiSelect={multiSelect}
        />
      )}
      <div className="flex flex-row gap-5 items-center">
        <div>
        <DateRangePicker
  startDate={startDate ?? undefined} 
  onStartDateChange={setStartDate}
  endDate={endDate ?? undefined} 
  onEndDateChange={setEndDate}
  errMessages={errMessages ?? undefined} 
/>

        </div>
        <div className="w-36">
          <IntervalDropdown interval={interval} setInterval={setInterval} />
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div className="text-red-500 text-[0.7rem] min-w-[250px] min-h-[20px]">
          {errMessages}
        </div>
        <button
          className="bg-blue-500 p-2 hover:bg-blue-600 font-semibold rounded-md px-4 text-gray-100"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ChartFiltersPanel;