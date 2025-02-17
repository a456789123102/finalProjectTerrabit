import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";



const PaginationControls = ({ pagination, setPagination }) => {
  return (
    <div className="mt-4 flex flex-row gap-4 items-center justify-between border">
      {/* Page Navigation */}
      <div className="flex items-center gap-2">
        {pagination.page > 1 && (
          <ChevronLeft
            className="w-6 h-6 text-blue-500 cursor-pointer"
            onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
          />
        )}
        <div className="p-2 text-center min-w-[80px]">
          Page {pagination.page} / {pagination.totalPages}
        </div>
        {pagination.page < pagination.totalPages && (
          <ChevronRight
            className="w-6 h-6 text-blue-500 cursor-pointer"
            onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
          />
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
          onChange={(e) =>
            setPagination((prev) => ({
              ...prev,
              pageSize: Number(e.target.value),
              page: 1,
            }))
          }
          className="p-1 border rounded text-gray-800"
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
