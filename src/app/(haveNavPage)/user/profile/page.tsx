"use client"
import React, { useState } from 'react'
import MyAccount from '../components/MyAccount';
import Addresses from '../components/Addresses';
import PurchaseTable from '../components/PurchaseTable';

function page() {
    const [menuClick, setMenuClick] = useState('My Account')

    const rightMenu = [
        { name: 'My Account', component: <MyAccount /> },
        { name: 'Address', component: <Addresses /> },
        { name: 'Purchase history', component: <PurchaseTable /> },
      ];
  return (
    <div className='flex items-center justify-center h-screen w-full '>
        <div className='border-2 border-gray-300 flex flex-row p-5 w-3/5 bg-white'>
{/* left menu side */}
<div className='flex-flex-col w-1/3'>
{
    rightMenu.map((item, index) => (
        <div key={index} className={`border-b-2 p-2 cursor-pointer hover:text-yellow-500 hover:underline ${item.name === menuClick ? "text-orange-700 border-orange-700":"text-black"}`} onClick={() => setMenuClick(item.name)}>{item.name}</div>
    ))
}
</div>

{/* right content area */}
        <div className='border w-2/3 h-80'>
    {rightMenu.find(item => item.name === menuClick)?.component}
        </div>
        </div>
        </div>
  )
}

export default page