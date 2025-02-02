import React, { useState } from "react";
import DateRangePicker from "./DateRangePicker";

const ChartFiltersPanel = ({interval, setInterval,startDate, setStartDate,endDate, setEndDate}) => {


  return (
    <div>
      <DateRangePicker
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
      />
    </div>
  );
};

export default ChartFiltersPanel;
