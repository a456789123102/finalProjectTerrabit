import React from 'react'
import FilterTableDropdown from './filterTableDropdown'
import { Search } from "lucide-react"

interface SearchAndFilterBarProps {
  tempSearchQuery: string;
  setTempSearchQuery: (value: string) => void;
  handleSearchQuery: (event: React.FormEvent) => void;
  columnKeys: string[];
  columnKeysFiltered: string[];
  handleColumnToggle: (column: string) => void;
  totalItems: number;
  fromSearch: string;
} 
function SearchAndFilterBar({
  tempSearchQuery,
  setTempSearchQuery,
  handleSearchQuery,
  columnKeys,
  columnKeysFiltered,
  handleColumnToggle,
  totalItems,
  fromSearch,
}: SearchAndFilterBarProps) {
  return (
    <div className='w-full flex flex-row  gap-4 '>
      <div className='flex flex-row text-[0.8rem]  w-full items-center'>
        <div className='mx-2 '>{totalItems} Items found.</div>
        {fromSearch === "" ? <></> : <div>  From Searching: {fromSearch}</div>}
      </div>
      <div className="flex flex-row w-full justify-end items-center">
        <FilterTableDropdown
          columnKeys={columnKeys}
          handleColumnToggle={handleColumnToggle}
          columnKeysFiltered={columnKeysFiltered}
        />
        <div className="flex flex-row relative mr-3">
          <input
            type="text"
            value={tempSearchQuery}
            onChange={(e) => setTempSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="p-2 border rounded text-gray-700 pr-10 border-gray-300 text-[0.8rem] h-10"
          />
          <div onClick={handleSearchQuery} className="absolute top-2 right-2">
            <Search size={24} className="text-gray-500 hover:text-black cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilterBar