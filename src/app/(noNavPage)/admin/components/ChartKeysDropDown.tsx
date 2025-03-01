import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { useTheme } from "@/app/context/themeContext";
import { Check,X,SlidersHorizontal } from "lucide-react";
import React from "react";

interface ChartKeysDropDownProps {
  chartKeys: string[];
  setChartKeys: (keys: string[]) => void;
  options: string[];
  multiSelect:boolean;
}

function ChartKeysDropDown({
  chartKeys,
  setChartKeys,
  options,
  multiSelect
}: ChartKeysDropDownProps) {
  const { theme, themeColors } = useTheme();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="border border-gray-300 flex flex-row " style={{backgroundColor:themeColors.tertiary}}><SlidersHorizontal size={18} /><div>Select Charts</div></Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Select Data"
        selectionMode={multiSelect ? "multiple" : "single"}
        style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
        className="border border-gray-300 w-full min-w-[150px]"
        selectedKeys={new Set(chartKeys)}
        onSelectionChange={(keys) => {
          setChartKeys(Array.from(keys) as string[]);
        }}
      >
        {options.map((key) => (
          <DropdownItem
            key={key}
            textValue={key}
            className="w-full p-1 border-b border-gray-300 "
          >
          <div className="flex flex-row items-center justify-between w-full gap-2 ">
          {chartKeys.includes(key) ? <Check size={16} color="green" />:<X size={16} color="red" />}
            <div className="">{key}</div>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default ChartKeysDropDown;
