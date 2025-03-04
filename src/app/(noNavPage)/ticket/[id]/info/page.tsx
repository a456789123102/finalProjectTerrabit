"use client"
import { AlarmClock, MessageSquareReply } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

function page() {
  const params = useParams()
  const { id } = params
  return (
<div className="w-full min-h-screen bg-slate-100 flex flex-col items-center">
  {/* Header */}
  <div className="flex flex-row w-full border-y border-gray-300 p-2">
    <div className="text-[1.1rem] px-10 ">Ticket ID: #{String(id).padStart(4, "0")}</div>
  </div>

  {/* Main Content */}
  <div className='p-5 flex flex-row w-full gap-5'>
    {/* Left Panel - Dynamic Height */}
    <div className='p-3 w-1/6 border border-gray-300 flex flex-col h-96 gap-2 sticky top-0 bg-white'>
      <div>TICKET INFORMATION</div>
      <div>Total Replies</div>
      <div className='text-gray-600 flex flex-row gap-1 items-center'>
        <MessageSquareReply size={18} />
        <div>18</div>
      </div>
      <div>Timestamp</div>
      <div className='text-gray-600 flex flex-row gap-1 items-center'>
        <AlarmClock size={18} />
        <div>1999-29-08 23:54</div>
      </div>
      <div className='border-t border-gray-300 pt-1'>Status</div>
      <div className='text-gray-600'>open</div>
      <div className='border-t border-gray-300 pt-1'>Actions</div>
      <div className='text-gray-600'>close this ticket</div>
    </div>

    {/* Right Panel - Expandable */}
    <div className='p-5 w-5/6 border flex flex-col gap-2 border-gray-300 bg-white h-[calc(100vh-4rem)]'>
      <div className='text-[1.5rem]'>How can I purchase order with my metamask account on your website? Even is it possible?</div>

      {/* Ticket Info Bar */}
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

      {/* Ticket Content */}
      <div className="whitespace-pre-wrap border-b border-gray-300 py-3 flex-1 overflow-auto">
        Hey, I’ve been exploring your website and I’m really interested in making a purchase. However, I prefer using **MetaMask** for payments instead of traditional methods.

        I was wondering: **Is it even possible to purchase an order using my MetaMask wallet?** If so, how does the process work? Do I need to manually send crypto to a given address, or is there an integrated payment flow that connects directly with MetaMask?

        Also, what cryptocurrencies are supported? Do you accept **ETH**, **USDC**, or any other tokens? And are there any additional fees or gas costs I should be aware of before proceeding?

        Would really appreciate a step-by-step guide on how to complete a purchase using MetaMask. Looking forward to your response! 🚀

        **Thanks!**
        User1
      </div>

      {/* Replies Section */}
      <div className='border border-red-500 mt-4 gap-5 flex flex-col flex-1 overflow-auto'>
        <div className='flex flex-col border bg-gray-50 p-5'>
          <div className='flex flex-row gap-2 pb-2 items-baseline'>
            <div>Admin1</div>
            <div className='text-[0.8rem] text-gray-600'>2mins ago</div>
          </div>
          <div className='border p-2 text-[0.9rem] min-h-32 bg-white text-gray-800'>
            Hello, thanks for your question. Unfortunately, our website still does not support payment via MetaMask.
          </div>
        </div>
      </div>

      {/* Reply Form - Sticky at Bottom */}
      <div className='flex flex-row gap-4 py-2 border-t border-gray-300 sticky bottom-0 bg-white'>
        <textarea placeholder='Reply to ticket' className='w-full border border-gray-300 h-20 p-3'></textarea>
        <button className='w-1/4 border border-gray-400 text-gray-800 text-center py-2'>Send</button>
      </div>
    </div>
  </div>
</div>

  )
}

export default page