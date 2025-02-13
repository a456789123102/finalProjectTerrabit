import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';

interface Status {
  key: string;
  label: string;
}

interface StatusSelectDropdownProps {
  status: string[]; // Initial selected status (array of key strings)
  setStatus: React.Dispatch<React.SetStateAction<string[]>>;
}

const StatusSelectDropdown = ({ status, setStatus }: StatusSelectDropdownProps) => {
  const statuses = useMemo(() => [
    { key: "awaiting_slip_upload", label: "To Pay" },
    { key: "awaiting_confirmation", label: "To Confirmed" },
    { key: "awaiting_rejection", label: "To Rejected" },
    { key: "order_approved", label: "Approved" },
    { key: "order_rejected", label: "Rejected" },
    { key: "order_cancelled", label: "Cancelled" },
  ], []);

  const [selectedOptions, setSelectedOptions] = useState<Status[]>([]);

  useEffect(() => {
    const initialSelectedOptions = status.map(key => statuses.find(s => s.key === key)).filter(Boolean) as Status[];
    setSelectedOptions(initialSelectedOptions);
  }, [status, statuses]); 

  const handleChange = (selectedOptions: Status[]) => {
    setSelectedOptions(selectedOptions);
    const selectedKeys = selectedOptions.map(option => option.key);
    setStatus(selectedKeys);
  };

  return (
<Select
  classNamePrefix="custom-select"
  isMulti={true}
  isClearable={true}
  isSearchable={true}
  placeholder={"Select order status..."}
  options={statuses}
  value={selectedOptions}
  className="text-sm text-black w-[200px] h-[40px]" // กำหนดขนาดคงที่
  onChange={handleChange}
  getOptionValue={(option) => option.key}
  getOptionLabel={(option) => option.label}
/>

  );
};

export default StatusSelectDropdown;