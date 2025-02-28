import Select from "react-select";


function IntervalDropdown({ 
  interval, 
  setInterval 
}: { 
  interval: string , 
  setInterval: (value: string ) => void 
}) {
  const options = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" }
  ];

  return (
    <Select 
      classNamePrefix="custom-select"
      isMulti={false}
      isClearable={false}
      isSearchable={false}
      placeholder={"Select interval..."}
      options={options}
      value={options.find(option => option.value === interval) || null} 
      onChange={(s) => setInterval( s!.value)}
    />
  );
}

export default IntervalDropdown;
