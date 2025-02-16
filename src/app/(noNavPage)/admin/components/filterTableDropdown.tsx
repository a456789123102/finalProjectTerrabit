import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import React from "react";
import { useTheme } from '@/app/context/themeContext';
import { Filter } from "lucide-react"

export default function FilterTableDropdown({ columnKeys, handleColumnToggle, columnKeysFiltered }) {
  const { theme, themeColors } = useTheme();
  const hoverColors = themeColors.primary
  console.log(hoverColors)
  return (
    <div className="flex flex-row items-center h-full p-1 pt-2 " >
      <Dropdown style={{ backgroundColor: themeColors.tertiary }} >
        <DropdownTrigger>
          <Button variant="bordered">
            <Filter size={27} className="text-gray-500 hover:text-black cursor-pointer"/>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" className="border">
          {columnKeys.map((key) => (
            <DropdownItem key={key} className={`hover:text-base border-b py-1 text-sm`}>
              <label className="flex items-center ">
                <input
                  type="checkbox"
                  checked={columnKeysFiltered.includes(key)}
                  onChange={() => handleColumnToggle(key)}
                  className="mr-2 "
                />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
