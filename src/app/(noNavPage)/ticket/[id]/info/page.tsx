"use client"
import { closeTicket, createReply, getTicketById } from '@/app/apis/ticket'
import { AlarmClock, MessageSquareReply } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { useUserStore } from "@/store/zustand";

function page() {

  const [ticket,setTicket] = useState({})
  const [loading, setLoading] = useState(true)
  const[message,setMessage] = useState("");
  const params = useParams()
  const { id } = params
  const ticketId = Array.isArray(id) ? id[0] : id;
  const { id: currentUserId } = useUserStore();


  const fetchTicket = async () => {
  
    try {
      const res = await getTicketById(ticketId); 
      console.log(res);
      setTicket(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };
  
  useEffect(() => {
fetchTicket();
  }, [id]);

const sendReply = async () => {
  try {
    if (!message.trim()) return; 
    await createReply(ticketId,message);
    setMessage("");
    fetchTicket();
  } catch (error) {
    console.error("Error sending reply:", error);
  }
}

const handleCloseTicket = async () => {
  try {
    await closeTicket(Number(ticketId));
    fetchTicket();
  } catch (error) {
    console.error("Error closing ticket:", error);
  }
}

if(loading) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
  return (
<div className="w-full min-h-screen bg-slate-100 flex flex-col items-center">
  {/* Header */}
  <div className="flex flex-row w-full border-y border-gray-300 p-2">
    <div className="text-[1.1rem] px-10 ">Ticket ID: #{String(id).padStart(4, "0")}</div>
  </div>

  {/* Main Content */}
  <div className="p-5 flex flex-row w-full gap-5 flex-1 min-h-0">
    {/* Left Panel - Dynamic Height */}
    <div className="p-3 w-1/6 border border-gray-300 flex flex-col h-96 gap-2 sticky top-0 bg-white">
      <div>TICKET INFORMATION</div>
      <div>Total Replies</div>
      <div className="text-gray-600 flex flex-row gap-1 items-center">
        <MessageSquareReply size={18} />
        <div>{ticket.messages ? ticket.messages.length : 0}</div>
      </div>
      <div>Last Activity</div>
      <div className="text-gray-600 flex flex-row gap-1 items-center">
        <AlarmClock size={18} />
        <div>{ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleString() : "N/A"}</div>
      </div>
      <div className="border-t border-gray-300 pt-1">Status</div>
      <div className="text-gray-600">
        {ticket.isSolved ? <div>Closed</div> : <div>Open</div>}
      </div>
      <div className="border-t border-gray-300 pt-1">Actions</div>
      <div className="text-gray-600">
        {ticket.isSolved ? <div>-</div> : <div onClick={handleCloseTicket} className="text-blue-500 underline cursor-pointer">Close this ticket</div>}
      </div>
    </div>

    {/* Right Panel - Expandable */}
    <div className="p-5 w-5/6 border flex flex-col gap-2 border-gray-300 bg-white flex-1 min-h-0">
      <div className="text-[1.5rem]">{ticket.topic}</div>

      {/* Ticket Info Bar */}
      <div className="flex flex-row gap-6 py-2 border-b border-gray-300">
        <div className="flex flex-row gap-1 items-center">
          <div className="text-gray-500">Created - </div>
          <div>{formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true, locale: enUS })}</div>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <div className="text-gray-500">By - </div>
          <div>{ticket.user?.username}{ticket.user?.isAdmin && " (Admin)"}</div>
        </div>
      </div>

      {/* Ticket Content */}
      <div className="text-[1.1rem] whitespace-pre-wrap border-b border-gray-300 p-5 text-gray-700 flex-grow overflow-auto min-h-[150px]">
        {ticket.details}
      </div>

      {/* Replies Section */}
      <div className="mt-4 gap-5 flex flex-col flex-grow overflow-auto min-h-0">
        {ticket.messages &&
          ticket.messages.map((message, i) => (
            <div
              className={`flex flex-col border bg-gray-50 p-5 ${
                currentUserId === message.senderId ? "border-blue-400" : "border-gray-300"
              }`}
              key={i}
            >
              <div className="flex flex-col gap-2 pb-2 items-baseline">
                <div className='flex flex-row gap-2'>
                  <div>{message.sender.username}</div>
                  {message.sender.isAdmin && (<div className='text-yellow-500'>(Admin)</div>)}
                </div>
                <div className="text-[0.7rem] text-gray-600">
                  {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true, locale: enUS })}
                </div>
              </div>
              <div className="border-t p-3 text-[0.9rem] text-gray-700">{message.content}</div>
            </div>
          ))}
      </div>

      {/* Reply Form */}
 {!ticket.isSolved &&
      <div className="flex flex-row gap-4 py-2 border-t border-gray-300 bg-white sticky bottom-0 w-full">
      <textarea
        placeholder="Reply to ticket"
        className="w-full border border-gray-300 h-20 p-3"
        value={message}
        maxLength={500}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <div className="w-1/4 flex flex-col justify-end">
        <div
          className="border hover:bg-blue-600 cursor-pointer bg-blue-500 text-white rounded-sm text-center py-2"
          onClick={sendReply}
        >
          Send
        </div>
      </div>
    </div>
 }
    </div>
  </div>
</div>

  )
}

export default page