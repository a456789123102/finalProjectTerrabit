"use client";
import { me } from "../apis/user"; 
import { useEffect } from 'react';
import { useUserStore } from '@/store/zustand'; 
import { useRouter } from "next/navigation"; 
import { logout } from '../apis/auth'; 
import React from 'react';
import Text from './text';
import Link from 'next/link';

function Nav() {
  const router = useRouter(); 
  const { username, setUser, clearUser } = useUserStore(); 

  useEffect(() => {
    if (!username) { 
      me() 
        .then((data) => {
          setUser(data); 
        })
        .catch(() => {
          //router.push("/login"); 
        });
    }
  }, [setUser, username, router]); 

  const handleLogout = async () => {
    await logout(); 
    clearUser(); 
    router.push("/login"); 
  };

  return (
    <Text className='flex flex-row justify-between bg-[#183D3D] h-7 px-5 text-yellow-400 '>
      <div className='flex flex-row gap-7 '>
        <div className='hover:underline cursor-pointer hover:text-yellow-200'>Games</div>
        <Link href={`/product`} className='hover:underline cursor-pointer hover:text-yellow-200'>Products</Link>
        <div className='hover:underline cursor-pointer hover:text-yellow-200'>News</div>
        <div className='hover:underline cursor-pointer hover:text-yellow-200'>Careers</div>
        <div className='hover:underline cursor-pointer hover:text-yellow-200'>Services</div>
      </div>
      <div className='flex flex-row items-center '>
        <input className='h-6 rounded-md pl-3 text-amber-800'></input>
        <div className='pl-3'>Search</div>
      </div>
      <div>
        {username ? (
          <div className="flex flex-row">
            <div className="text-violet-400">Welcome, {username}!</div>
            <button className="pl-3 cursor-pointer hover:text-yellow-200 hover:underline" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <div>Please login</div>
        )}
      </div>
    </Text>
  );
}

export default Nav;
