import React from 'react';

interface AdminSidebarProps {
  isSidebarVisible: boolean;
  isScrollDown: boolean;
}

function AdminSidebar({ isSidebarVisible,isScrollDown }: AdminSidebarProps) {
  return (
    <div
      className={`bg-white min-h-full w-1/6 border-r fixed left-0 top-12  mx-[3px] z-30 
        ${isScrollDown ? 'top-0 z-40 fixed' : 'top-12 absolute'}
        ${isSidebarVisible ? 'block' : 'hidden '}`}
    >
      adminSidebar
    </div>
  );
}

export default AdminSidebar;
