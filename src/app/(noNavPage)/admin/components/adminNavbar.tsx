// adminNavbar.tsx
import { useTheme } from '@/app/context/themeContext';
import React from 'react';

interface AdminNavbarProps {
  toggleSidebar: () => void;
  isScrollDown: boolean;
}

function AdminNavbar({ toggleSidebar, isScrollDown }: AdminNavbarProps) {
  const { theme, toggleTheme, themeColors } = useTheme();

  return (
    <div style={{ backgroundColor: themeColors.navbar, color: themeColors.text }}>
      <div
        className={`h-12 flex flex-row items-center border w-full ${isScrollDown ? 'top-0 z-40 fixed' : 'top-8'}`}
        style={{ backgroundColor: themeColors.navbar, color: themeColors.text }}  
      >
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mx-2" onClick={toggleSidebar}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
        </div>
        <div className="flex flex-row relative">
          <input className="h-8 pr-7 pl-2 border border-gray-500 w-[278px]"/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 absolute text-black right-1 top-1/2 transform -translate-y-1/2 hover:border cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <div onClick={toggleTheme} className='mx-10 cursor-pointer hover:text-yellow-400'>
          {theme === 'light' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>

          }
        </div>
      </div>
    </div>
  );
}


export default AdminNavbar;
