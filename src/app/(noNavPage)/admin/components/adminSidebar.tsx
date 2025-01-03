import { useTheme } from '@/app/context/themeContext';
import React from 'react';

interface AdminSidebarProps {
  isSidebarVisible: boolean;
  isScrollDown: boolean;
}

function AdminSidebar({ isSidebarVisible,isScrollDown }: AdminSidebarProps) {
  const { theme, themeColors } = useTheme();
  return (
    <div
    style={{ backgroundColor: themeColors.navbar ,color: themeColors.text }}
      className={` min-h-full w-1/6 border-r fixed left-0 top-12 z-30 
        ${isScrollDown ? 'top-0 z-40 fixed' : 'top-12 absolute'}
        ${isSidebarVisible ? 'block' : 'hidden '}`}
    >
      <div className='h-20 w-full border' style={{ backgroundColor: themeColors.primary}}>Primary</div>
      <div className='h-20 w-full border' style={{ backgroundColor: themeColors.secondary}}>Secondary</div>
      <div className='h-20 w-full border' style={{ backgroundColor: themeColors.tertiary}}>tertiary</div>
    </div>
  );
}

export default AdminSidebar;
