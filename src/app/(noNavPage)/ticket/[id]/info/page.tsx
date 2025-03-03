"use client"
import { AlarmClock, MessageSquareReply } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

function page() {
  const params = useParams()
  const { id } = params
  return (
    <div className="w-full h-screen bg-slate-100 flex flex-col items-center">
      <div className="flex flex-row w-full border-y border-gray-300 p-2">
        <div className="text-[1.1rem] px-10 ">Ticket ID: #{String(id).padStart(4, "0")}</div>
      </div>
      <div className='p-5 flex flex-row w-full gap-5 '>
        <div className='p-3  w-1/6 border border-gray-300 flex flex-col gap-2 bg-white'>
          <div>TICKET INFORMATION</div>
          <div>Total Replies</div>
          <div className='text-gray-600 flex flex-row gap-1 items-center'>
            <MessageSquareReply size={18} />
            <div>18</div>
          </div>
          <div>Timestamp</div>
          <div className='text-gray-600 flex flex-row gap-1 items-center '>
            <AlarmClock size={18} />
            <div>1999-29-08 23:54</div>
          </div>
          <div className='border-t border-gray-300 pt-1'>Status</div>
          <div className='text-gray-600'>open</div>
          <div className='border-t border-gray-300 pt-1'>Actions</div>
          <div className='text-gray-600'>close this ticket</div>
        </div>
        {/* right */}
        <div className='p-5  w-4/6 border flex flex-col gap-2 border-gray-300 bg-white'>
          <div className='text-[1.5rem]'>How can I purchase order with my metamask account on your website? Even is it possible?</div>
          {/* createbar */}
          <div className='flex flex-row gap-4 py-2 border-b border-gray-300'>
            <div className='flex flex-row gap-1 items-center'>
              <div className='text-gray-600'>Created - </div>
              <div>2 days ago</div>
            </div>
            <div className='flex flex-row gap-1 items-center'>
              <div className='text-gray-600'>By - </div>
              <div>User1</div>
            </div>
          </div>
          <div className="whitespace-pre-wrap">
  Hey, I’ve been exploring your website and I’m really interested in making a purchase. However, I prefer using **MetaMask** for payments instead of traditional methods.

  I was wondering: **Is it even possible to purchase an order using my MetaMask wallet?** If so, how does the process work? Do I need to manually send crypto to a given address, or is there an integrated payment flow that connects directly with MetaMask?

  Also, what cryptocurrencies are supported? Do you accept **ETH**, **USDC**, or any other tokens? And are there any additional fees or gas costs I should be aware of before proceeding?

  Would really appreciate a step-by-step guide on how to complete a purchase using MetaMask. Looking forward to your response! 🚀

  **Thanks!**
  User1
</div>

        </div>


      </div>
    </div>
  )
}

export default page