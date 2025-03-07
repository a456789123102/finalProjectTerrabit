"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

function AccDetails({ info }) {
  console.log("info:", info)
  const router = useRouter()

  return (
    <div className="p-3 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Account Insights</h2>
        <p className="text-sm text-gray-500">
          Monitor your account activity and performance
        </p>
      </div>
      <div className="p-4 border-b flex flex-row gap-2 hover:bg-gray-100 cursor-pointer" onClick={()=> router.push("/address/myAddress")}>
        <div className='text-slate-600'>Address:</div>
        <div >{info.countAddress}</div>
      </div>
      <div className="p-4 border-b flex flex-row gap-2 hover:bg-gray-100 cursor-pointer" onClick={()=> router.push("/ticket/myTickets")}>
        <div className='text-slate-600'>Tickets:</div>
        <div >{info.countTicket}</div>
      </div>
      <div className="p-4 border-b flex flex-row gap-10 hover:bg-gray-100 cursor-pointer" onClick={()=> router.push("/user/purchase")}>
        <div className='flex flex-row gap-2 '>
          <div className='text-slate-600'>Purchase Order:</div>
          <div >{info.countOrder}</div>
        </div>
        <div className='flex flex-row gap-2'>
          <div className='text-slate-600'>Buyed Items:</div>
          <div >{info.countOrderItems}</div>
        </div>

        <div className='flex flex-row gap-2'>
          <div  className='text-slate-600'>Total spend:</div>
          <div>{info.totalSpend}</div>
        </div>
      </div>
    </div>
  )
}

export default AccDetails