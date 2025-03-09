import React from 'react';
import FilterTableDropdown from './filterTableDropdown';
import { Search } from "lucide-react";
import SortBySelectedDropDown from './SortBySelectedDropDown';

interface SearchAndFilterBarProps {
  tempSearchQuery: string;
  setTempSearchQuery: (value: string) => void;
  handleSearchQuery: (event: React.FormEvent<HTMLFormElement>) => void;
  columnKeys: string[];
  columnKeysFiltered: string[];
  handleColumnToggle: (column: string) => void;
  totalItems: number;
  fromSearch: string;
  sortData: { orderBy: string; orderWith: string; label: string; }[]; 
  orderBy: string;
  setOrderBy: (value: string) => void;
  orderWith: string;
  setOrderWith: (value: string) => void;
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
  sortData,
  orderBy,
  setOrderBy,
  orderWith,
  setOrderWith,
}: SearchAndFilterBarProps) {
  return (
    <div className='flex flex-row gap-4 w-full'>
      <div className='flex flex-row text-[0.8rem] w-full items-center'>
        <div className='mx-2'>{totalItems} Items found.</div>
        {fromSearch !== "" && <div>From Searching: {fromSearch}</div>}
      </div>
      <div className="flex flex-row w-full justify-end items-center">
        <SortBySelectedDropDown
          data={sortData}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderWith={orderWith}
          setOrderWith={setOrderWith}
        />
        <FilterTableDropdown
          columnKeys={columnKeys}
          handleColumnToggle={handleColumnToggle}
          columnKeysFiltered={columnKeysFiltered}
        />
        <form onSubmit={handleSearchQuery} className="flex flex-row relative mr-3">
          <input
            type="text"
            value={tempSearchQuery}
            onChange={(e) => setTempSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="p-2 border rounded text-gray-700 pr-10 border-gray-300 text-[0.8rem] h-10"
          />
          <button type="submit" className="absolute top-2 right-2">
            <Search size={24} className="text-gray-500 hover:text-black cursor-pointer" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchAndFilterBar;
