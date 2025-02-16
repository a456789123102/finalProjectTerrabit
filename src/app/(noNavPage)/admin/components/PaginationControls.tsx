import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationControls = ({ pagination, handlePrevPage, handleNextPage, handlePageSizeChange }) => {
  return (
    <div className="mt-4 flex flex-row gap-4 items-center justify-between border p-2">
      {/* Page Navigation */}
      <div></div>
      <div className="flex gap-2 items-center">
        {/* ปุ่ม Previous */}
        {pagination.page > 1 && (
          <ChevronLeft className="w-6 h-6 text-blue-500 cursor-pointer" onClick={handlePrevPage} />
        )}

        <div className="p-2 text-sm">
          Page {pagination.page} / {pagination.totalPages}
        </div>

        {/* ปุ่ม Next */}
        {pagination.page < pagination.totalPages && (
          <ChevronRight className="w-6 h-6 text-blue-500 cursor-pointer" onClick={handleNextPage} />
        )}
      </div>

      {/* Page Size Selector */}
      <div className="flex items-center gap-2 mr-2">
        <label htmlFor="pageSize" className="text-sm">
        Show:
        </label>
        <select
          id="pageSize"
          value={pagination.pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="p-1 border rounded text-black"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationControls;
