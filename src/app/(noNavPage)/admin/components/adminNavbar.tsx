import React from 'react';

interface AdminNavbarProps {
  toggleSidebar: () => void;
  isScrollDown: boolean;
}

function AdminNavbar({ toggleSidebar, isScrollDown }: AdminNavbarProps) {
  return (
    <div>
      <div
        className={`bg-white h-12 flex flex-row items-center border mx-[3px] w-full ${
          isScrollDown ? 'top-0 z-40 fixed' : 'top-8'
        }`}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 mx-2"
            onClick={toggleSidebar}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
        </div>
        <div className="flex flex-row relative">
          <input className="h-8 pr-7 pl-2 border border-gray-500 w-64" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 absolute right-1 top-1/2 transform -translate-y-1/2 hover:border cursor-pointer"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
