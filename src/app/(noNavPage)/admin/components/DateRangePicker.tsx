import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({startDate,onStartDateChange,endDate,onEndDateChange}) => {

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => onStartDateChange(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
      />
      <span>to</span>
      <DatePicker
        selected={endDate}
        onChange={(date) =>  onEndDateChange(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
      />
    </div>
  );
};

export default DateRangePicker;