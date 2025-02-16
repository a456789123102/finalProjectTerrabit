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
    <div className='w-full flex flex-row  items-center gap-4 '>
      <div className='flex flex-row text-[0.8rem] w-full'>
        <div className='mx-2'>{totalItems} Items found.</div>
        {fromSearch === "" ? <></> : <div>  From Searching: {fromSearch}</div>}
      </div>
      <div className="flex flex-row w-full justify-end">
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
            className="p-2 border rounded text-black pr-10"
          />
          <div onClick={handleSearchQuery} className="absolute top-2 right-2">
            <Search size={26} className="text-gray-500 hover:text-black cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilterBar