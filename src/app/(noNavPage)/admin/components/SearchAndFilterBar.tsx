import React from 'react'
import FilterTableDropdown from './filterTableDropdown'

interface SearchAndFilterBarProps {
    tempSearchQuery: string;
    setTempSearchQuery: (value: string) => void;
    handleSearchQuery: (event: React.FormEvent) => void;
    columnKeys: string[];
    columnKeysFiltered: string[];
    handleColumnToggle: (column: string) => void;
    totalProduct: number;
    fromSearch: string;
  }
function SearchAndFilterBar({
  tempSearchQuery,
  setTempSearchQuery,
  handleSearchQuery,
  columnKeys,
  columnKeysFiltered,
  handleColumnToggle,
  totalProduct,
  fromSearch,
}: SearchAndFilterBarProps) {
  return (
<div className='w-full flex flex-row justify-between items-center gap-4 '>
  <div className='flex flex-row w-full'>
    <div className='mx-2'>{totalProduct} products found.</div>
    {fromSearch ===""?<></> : <div>  From Searching: {fromSearch}</div>}
  </div>
<div className="flex flex-row w-full justify-end">
    <FilterTableDropdown
      columnKeys={columnKeys}
      handleColumnToggle={handleColumnToggle}
      columnKeysFiltered={columnKeysFiltered}
    />
    <div className="flex flex-row">
      <input
        type="text"
        value={tempSearchQuery}
        onChange={(e) => setTempSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="p-2 border rounded text-black"
      />
      <div onClick={handleSearchQuery} className="px-4 py-2 border cursor-pointer hover:text-yellow-600 ml-2 mr-4 ">
        Search
      </div>
    </div>
  </div>
</div>
  )
}

export default SearchAndFilterBar