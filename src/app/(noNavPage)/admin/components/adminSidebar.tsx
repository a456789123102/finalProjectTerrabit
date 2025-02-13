import { useTheme } from '@/app/context/themeContext';
import React from 'react';
import SideMenu from './SideMenu';

interface AdminSidebarProps {
  isSidebarVisible: boolean;
  isScrollDown: boolean;
}

function AdminSidebar({ isSidebarVisible,isScrollDown }: AdminSidebarProps) {
  const { theme, themeColors } = useTheme();
  return (
    <div
    style={{ backgroundColor: themeColors.base ,color: themeColors.text }}
      className={` min-h-full w-1/6 border-r fixed left-0 top-12 z-30 
        ${isScrollDown ? 'top-0 z-40 fixed' : 'top-12 absolute'}
        ${isSidebarVisible ? 'block' : 'hidden '}`}
    >
      <SideMenu />
      <div className='h-20 w-full border' style={{ backgroundColor: themeColors.base}}>Base</div>
       <div className='h-20 w-full border' style={{ backgroundColor: themeColors.bg}}>bg</div>
      <div className='h-20 w-full border' style={{ backgroundColor: themeColors.primary}}>Primary</div>
      <div className='h-20 w-full border' style={{ backgroundColor: themeColors.secondary}}>Secondary</div>
      <div className='h-20 w-full border' style={{ backgroundColor: themeColors.tertiary}}>tertiary</div>

    </div>
  );
}

export default AdminSidebar;
