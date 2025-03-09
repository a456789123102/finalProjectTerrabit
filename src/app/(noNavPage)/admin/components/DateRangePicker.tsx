import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  startDate?: Date; 
  onStartDateChange: (date: Date) => void; 
  endDate?: Date; 
  onEndDateChange: (date: Date) => void; 
  errMessages?: string;
}


const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  errMessages,
}) => {
  return (
    <div className="flex flex-row gap-2 items-baseline">
      <DatePicker
        selected={startDate}
        onChange={(date) => date && onStartDateChange(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        className="text-black px-2 border border-gray-300 h-8"
      />
      <span>To:</span>
      <DatePicker
        selected={endDate}
        onChange={(date) => date && onEndDateChange(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        className={`text-black px-2 border ${
          errMessages ? "border-red-600" : "border-gray-300"
        } h-8`}
      />
    </div>
  );
};

export default DateRangePicker;
