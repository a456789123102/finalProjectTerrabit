"use client"
import { closeTicket, myTickets } from '@/app/apis/ticket';
import { ChevronLeft, ChevronRight, Search, Ticket } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation"
import Select, { SingleValue } from "react-select"; 


interface Ticket {
  id: number;
  topic: string;
  updatedAt: string;
  isSolved: boolean;
}


interface PaginationState {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}


interface SortOption {
  orderBy: string;
  orderWith: string;
  label: string;
}

interface StatusOption {
  value: string;
  label: string;
}


interface TicketResponse {
  tickets: Ticket[];
  pagination: PaginationState;
}
function Page() {
 
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalPages: 1,
    totalItems: 0,
  });
  const SelectNoSSR = dynamic(() => import("react-select"), { ssr: false });
  const [tickets, setTickets] = useState([]);
  const [orderBy, setOrderBy] = useState("");
  const [orderWith, setOrderWith] = useState("");
  const [isSolved, setIssolved] = useState("");
  const [search, setSearch] = useState('');
  const [tempSearch, setTempSearch] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams(); 

  const getTickets = async () => {
    const data = await myTickets(search, orderBy, orderWith, isSolved, pagination.page.toString(), pagination.pageSize.toString());
    console.log("Data: " + JSON.stringify(data));
    setTickets(data.tickets);
    setPagination(data.pagination);
  }

  useEffect(() => {
    getTickets();
  }, [search, orderBy, orderWith, isSolved, pagination.page]);

  useEffect(() => {
    const statusParam = searchParams.get("status");

    if (statusParam) {
      setIssolved(statusParam === "solved"? "true" : statusParam === "unsolved"? "false" : "");
    }
  }, [searchParams]);

  const handleSearch = () => {
    setSearch(tempSearch);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };
  

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleCloseTicket = async (id:number) => {
    try {
      await closeTicket(id);
      getTickets();
    } catch (error) {
      console.error("Error closing ticket:", error);
    }
  }



  const sortByOptions: SortOption[] = [
    { orderBy: "desc", orderWith: "createdAt", label: "Creation Date: Newest First" },
    { orderBy: "asc", orderWith: "createdAt", label: "Creation Date: Oldest First" },
    { orderBy: "desc", orderWith: "updatedAt", label: "Last Activity: Most Recent First" },
    { orderBy: "asc", orderWith: "updatedAt", label: "Last Activity: Oldest First" },
  ];

  const statusOptions: StatusOption[] = [
    { value: "false", label: "Open" },
    { value: "true", label: "Closed" },
    { value: "", label: "All" },
  ];



  return (
    <div className="w-full h-screen bg-slate-100 flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-row w-full border-y border-gray-300 p-2">
        <div className="text-[1.1rem] px-10">My Ticket Requests</div>
      </div>

      {/* Controls */}
      <div className="w-full flex flex-row justify-between items-center px-10 my-3 gap-2">
        <div className="flex flex-row justify-between items-center gap-4">
        <Select
  className="text-[0.8rem] w-52"
  placeholder="Sort by..."
  options={sortByOptions}
  getOptionLabel={(e) => (e as SortOption).label} 
  getOptionValue={(e) => (e as SortOption).orderBy + "-" + (e as SortOption).orderWith}
  value={sortByOptions.find(
    (option) => option.orderBy === orderBy && option.orderWith === orderWith
  )}
  onChange={(selectedOption: SingleValue<SortOption>) => {
    if (selectedOption) {
      setOrderBy(selectedOption.orderBy);
      setOrderWith(selectedOption.orderWith);
    }
  }}
/>

<Select
  className="text-[0.8rem] w-36"
  placeholder="Ticket Status"
  defaultValue={statusOptions[0]}
  options={statusOptions}
  getOptionLabel={(e) => (e as StatusOption).label} 
  getOptionValue={(e) => (e as StatusOption).value}
  value={statusOptions.find((option) => option.value === isSolved)}
  onChange={(selectedOption: SingleValue<StatusOption>) => {
    setIssolved(selectedOption ? selectedOption.value : "");
  }}
/>


        </div>
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="text-slate-700 flex flex-row relative">
            <input
              type="text"
              className="w-48 border p-2 pr-8 text-[0.9rem] rounded-sm"
              placeholder="Search ticket"
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); 
                  handleSearch();
                }
              }}
            />
            <Search
              className="absolute top-2 right-2 text-gray-400 cursor-pointer hover:text-yellow-500"
              onClick={() => handleSearch()}
            />
          </div>
          <div className="border rounded-sm flex flex-row gap-1 items-center bg-blue-500 text-[0.9rem] text-white p-2 hover:text-yellow-300 hover:bg-blue-600 cursor-pointer">
           <Ticket size={17} />
            <div onClick={() => router.push("/ticket/create")}>Create new Ticket</div>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="w-full flex flex-col px-10 flex-grow">
        {/* Header Row */}
        <div className="w-full grid grid-cols-8 px-10  border-y border-gray-500 text-left font-semibold py-4">
          <div className="col-span-1">ID</div>
          <div className="col-span-3">Subject</div>
          <div className="col-span-2">TimeStamp</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Actions</div>
        </div>

        {/* Data Rows */}
        {tickets && tickets.length > 0 ? (
          tickets.map((ticket:Ticket) => (
            <div
              key={ticket.id}
              className="w-full grid grid-cols-8 text-[0.9rem] font-light px-10 py-3 pt-4 border-b border-gray-300 text-gray-700 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                console.log("Navigate to ticket details page:", ticket.id);
                router.push(`/ticket/${ticket.id}/info`);
              }}
            >
              <div className="col-span-1">#{String(ticket.id).padStart(4, "0")}</div>
              <div className="col-span-3 overflow-hidden">{ticket.topic}</div>
              <div className="col-span-2">{formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true, locale: enUS })}</div>
              <div className="col-span-1">{ticket.isSolved ? "Closed" : "Open"}</div>
              <div className="col-span-1">
                {ticket.isSolved ? (
                  <div>-</div>
                ) : (
                  <div
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloseTicket(ticket.id);
                    }}
                  >
                    Close Ticket
                  </div>
                )}
              </div>

            </div>
          ))
        ) : (
          <div className="w-full text-center text-gray-500 py-4">No tickets found</div>
        )}

        {/* Push pagination to the bottom */}
        <div className="flex-grow"></div>
      </div>

      {/* Pagination Controller */}
      <div className="flex flex-row gap-4 items-center justify-center py-4 border-t border-gray-300">
        {pagination.page > 1 && (
          <ChevronLeft
            className="transition-transform duration-200 hover:scale-125 cursor-pointer"
            size={40}
            onClick={handlePrevPage}
          />
        )}
        <div>
          Page {pagination.page} / {pagination.totalPages}
        </div>
        {pagination.totalPages > pagination.page && (
          <ChevronRight
            className="transition-transform duration-200 hover:scale-125 cursor-pointer"
            size={40}
            onClick={handleNextPage}
          />
        )}
      </div>
    </div>

  )
}

export default Page;
