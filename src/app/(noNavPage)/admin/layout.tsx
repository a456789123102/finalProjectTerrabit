'use client'
import { useEffect, useState } from 'react';
import { PropsWithChildren } from 'react';
import AdminNavbar from './components/adminNavbar';
import AdminSidebar from './components/adminSidebar';

function Layout({ children }: PropsWithChildren) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() =>{
    const handleScroll =() =>{
        if(window.scrollY > 30){
            setIsScrollDown(true);
        }else{
            setIsScrollDown(false);
        }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
      };
  },[])

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
 

  return (
    <div className={`relative min-h-screen `}>
      <AdminNavbar toggleSidebar={toggleSidebar} isScrollDown={isScrollDown}/>
      <div className={`flex flex-row`}>
        <AdminSidebar isSidebarVisible={isSidebarVisible} isScrollDown={isScrollDown}/>
        <div className={` ${isSidebarVisible ? 'w-5/6 ml-[16.6%]'  : 'w-full'} ${isScrollDown ? 'mt-12':'mt-0'}`}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
