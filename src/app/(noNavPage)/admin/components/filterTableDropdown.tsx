import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import React from "react";

export default function FilterTableDropdown({ columnKeys, handleColumnToggle, columnKeysFiltered }) {
  return (
    <div className="flex flex-row items-center text-yellow-600 h-full justify-end">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">
            <div>Dropdown</div>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions">
          {columnKeys.map((key) => (
            <DropdownItem key={key}>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={columnKeysFiltered.includes(key)}
                  onChange={() => handleColumnToggle(key)}
                  className="mr-2"
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
