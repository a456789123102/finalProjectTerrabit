import Select from "react-select";

interface ChartKeysDropDownProps {
  chartKeys: string[];
  setChartKeys: (keys: string[]) => void;
  options: string[];
}

function ChartKeysDropDown({
  chartKeys,
  setChartKeys,
  options,
}: ChartKeysDropDownProps) {
  return (
 
      <Select
        isMulti={true}
        placeholder={"Select Data..."}
        options={options.map(key => ({ value: key, label: key }))}
        value={chartKeys.map(key => ({ value: key, label: key }))}
        onChange={(selectedOptions) => 
          setChartKeys(selectedOptions.map(option => option.value))
        }
      />

  );
}

export default ChartKeysDropDown;
