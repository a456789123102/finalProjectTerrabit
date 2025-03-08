'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/zustand';
import AdminMenu from './adminMenu';
import UserMenu from './userMenu';
import { me } from '../apis/user';
import Link from 'next/link';
import Text from './text';
import { BellRing, X } from 'lucide-react';
import { deleteAllNoti, deleteOneNoti, myNotifications } from '../apis/notification';

function Logo() {
  const router = useRouter();
  const { username, isAdmin, setUser } = useUserStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null); // ใช้จับ element เพื่อปิด dropdown
  const [noti, setNoti] = useState([]);
  const [totalNoti, setTotalNoti] = useState(0)

  const fetchNotifications = async () => {
    try {
      const res = await myNotifications();
      console.log("res:", res)
      setNoti(res.notifications);
      setTotalNoti(res.total);

    } catch (error) {
      console.error();
      (error);
    }
  }
  useEffect(() => {
    fetchNotifications();
  }, [username])


  useEffect(() => {
    if (!username) {
      me()
        .then((data) => {
          setUser(data);
        })
        .catch(() => { });
    }
  }, [username, setUser, router]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !(notificationRef.current as HTMLElement).contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCloseClick = async (id: number) => {
    try {
      await deleteOneNoti(id);

      setNoti((prev) => prev.filter((notification) => notification.id !== id));
      setTotalNoti((prev) => prev - 1);

      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleClearAllClick = async () => {
    try {
      await deleteAllNoti();

      setNoti([]);
      setTotalNoti(0);

      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };



  return (
    <Text className='flex flex-row justify-between w-screen h-10 px-5 pr-8 bg-[#181C14] text-yellow-500 text-[0.9rem] items-center'>
      <Link href={'/'} className='hover:text-yellow-300 cursor-pointer text-[1.4rem]'>
        Terrabit Pixel Studio
      </Link>

      <div className='flex flex-row items-center gap-6 relative' ref={notificationRef}>
        {username ? (
          <div className='flex flex-row items-center gap-4'>
            <div>Welcome! {username}</div>
            <UserMenu />

            <div className='relative cursor-pointer p-1' onClick={() => setShowNotifications(!showNotifications)}>
              <BellRing size={22} className='hover:text-yellow-300' />
              {noti.length > 0 && (
                <div className='absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full text-[0.6rem] flex items-center justify-center text-white'>
                  {totalNoti}
                </div>
              )}
            </div>
            {showNotifications && (
              <div className='absolute top-8 right-0 w-72 bg-white border border-gray-300 rounded-sm shadow-lg z-50 max-h-[80vh] overflow-scroll'>
                {noti.length > 0 ? (
                  <div>
                    {noti.map((notification) => (
                      <div key={notification.id} className="flex justify-between items-center px-4 text-[0.8rem] text-slate-700 py-2 border-b">

                        {notification.url ? (
                          <Link onClick={() => handleCloseClick(notification.id)} href={notification.url} className="text-blue-900 hover:bg-gray-100 flex-1 px-2 py-1 rounded-md">
                            {notification.message}
                          </Link>
                        ) : (
                          <div onClick={() => handleCloseClick(notification.id)} className="px-2 py-1 flex-1">{notification.message}</div>
                        )}


                        <X onClick={() => handleCloseClick(notification.id)} className="text-sm text-red-500 hover:bg-red-200 cursor-pointer w-1/5" />
                      </div>
                    ))}

                    <div className="px-4 py-2 text-center text-blue-500 hover:underline cursor-pointer"
                      onClick={() => handleClearAllClick()}>
                      Clear All
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-2 text-gray-500">No new notifications</div>
                )}

              </div>
            )}
          </div>
        ) : (
          <Link href="/login" className="hover:underline">login</Link>
        )}
        {isAdmin && <AdminMenu />}
      </div>


    </Text>
  );
}

export default Logo;
