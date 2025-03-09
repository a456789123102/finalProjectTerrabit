import { useTheme } from "@/app/context/themeContext";
import { Send } from "lucide-react";
import useFetchTickets from "../../hooks/tickets/useFetchTickets";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

interface Ticket {
    id: number;
    topic: string;
    createdAt: string;
    isSolved: boolean;
  }

  const NewTicketBox = () => {
    const router = useRouter();
    const { themeColors } = useTheme();

    const { tickets, loading, error } = useFetchTickets();
    console.log("tickets in page:", tickets)

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="border border-gray-300  " style={{ backgroundColor: themeColors.base }}>
            <div className="p-3 border-b border-gray-300 font-medium text-[1.3rem]">NEW Tickets</div>
            <div className="m-4 mt-5 flex flex-col gap-2">
                {tickets && tickets.map((ticket:Ticket,i) => (
                    <div className="border p-3 border-gray-300 rounded-[4px] flex flex-row justify-between" key={i}>
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-2 items-center">
                                <div className="flex flex-row gap-1 text-[0.8rem]">
                                    <div>Ticket ID:</div>
                                    <div>#{String(ticket.id).padStart(4, "0")}</div>
                                </div>
                                <div className="overflow-hidden text-[0.8rem]">{ticket.topic}</div>
                            </div>
                            <div className="text-gray-500 text-[0.65rem]">
                                <div className="flex flex-row gap-2">
                                    <div>{new Date(ticket.createdAt).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: false,
                                    })}</div>
                                    <div>({formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true, locale: enUS })})</div>
                                </div>
                                <div className="overflow-hidden text-[0.65rem]">{ticket.isSolved ? "Closed" : "Open"}</div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 text-gray-500">
                            <Send className="hover:text-yellow-600 cursor-pointer" onClick={() => (router.push(`/ticket/${ticket.id}/info`))} size={20} />
                        </div>
                    </div>))}
            </div>
        </div>
    );
}

export default NewTicketBox;
