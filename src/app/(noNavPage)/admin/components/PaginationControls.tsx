// components/PaginationControls.js
import React from "react";

const PaginationControls = ({ pagination, handlePrevPage, handleNextPage, handlePageSizeChange }) => {
  return (
    <div className="mt-4 flex flex-row gap-4 items-center justify-between border">
      {/* Page Navigation */}
      <div></div>
      <div className="flex gap-2">
        <button
          onClick={handlePrevPage}
          disabled={pagination.page === 1}
          className="p-2 bg-blue-500 text-white "
        >
          Previous
        </button>
        <div className="p-2">
          Page {pagination.page} / {pagination.totalPages}
        </div>
        <button
          onClick={handleNextPage}
          disabled={pagination.page === pagination.totalPages}
          className="p-2 bg-blue-500 text-white "
        >
          Next
        </button>
      </div>

      {/* Page Size Selector */}
      <div className="flex items-center gap-2 mr-2">
        <label htmlFor="pageSize" className="text-sm">
          Items per page:
        </label>
        <select
          id="pageSize"
          value={pagination.pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="p-1 border rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationControls;
