"use client"
import { createTicket, justCountTickets } from "@/app/apis/ticket";
import { Ticket, TicketCheck, TicketX } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CreateTicketForm = () => {

    const [topic, setTopic] = useState("");
    const [details, setDetails] = useState("");
    const [countTickets, setCountTickets] = useState({
        "all": 0,
        "solved": 0,
        "unsolved": 0
    });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!topic.trim() || !details.trim()) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            const newticket = await createTicket(topic, details);
            console.log("Created:", newticket)
            router.push(`/ticket/${newticket.id}/info`)
        } catch (error) {
            console.error("Error creating ticket:", error);
        }
    };

    const getCountTickets = async () => {
        try {
            const res = await justCountTickets();
            console.log("countres:", res)

            setCountTickets(res);
        } catch (error) {
            console.error("Error counting tickets:", error);
        }
    }
    useEffect(() => {
        getCountTickets();
    }, []);

    return (
        <div className="bg-slate-50 h-screen w-full flex-col items-start flex gap-5 ">
            <div className="border-y w-full p-3 px-10 text-[1.3rem] border-gray-300 bg-white mt-10">Creat Ticket to contract Supports</div>
            <div className="flex flex-row w-full gap-5 p-10">
                {/* lefdt side */}
                <div className="w-2/6 p-6 border bg-white border-gray-300 shadow-md rounded-[4px] flex flex-col gap-2">
                    <div className="py-4 text-[1.1rem]">TICKET INFORMATIONS</div>
                    <div className="flex flex-col p-2 gap-2 border-t border-gray-300 hover:bg-slate-100 cursor-pointer" onClick={()=>router.push("/ticket/myTickets")}>
                        <div>All Tickets</div>
                        <div className="flex flex-row gap-2 items-center" >
                            <Ticket color="blue" size={20} />
                            <div className="text-gray-600">{countTickets.all}</div>
                        </div>
                    </div>
                    <div className="flex flex-col p-2 gap-2 border-t border-gray-300 hover:bg-slate-100 cursor-pointer" onClick={()=>router.push("/ticket/myTickets?status=unsolved")}>
                        <div>Open Tickets</div>
                        <div className="flex flex-row gap-2 items-center" >
                            <TicketX color="red" size={20} />
                            <div className="text-gray-600">{countTickets.unsolved}</div>
                        </div>
                    </div>
                    <div className="flex flex-col p-2 gap-2 border-t border-gray-300 hover:bg-slate-100 cursor-pointer" onClick={()=>router.push("/ticket/myTickets?status=solved")}>
                        <div>Closed Tickets</div>
                        <div className="flex flex-row gap-2 items-center">
                            <TicketCheck color="green" size={20} />
                            <div className="text-gray-600">{countTickets.solved}</div>
                        </div>
                    </div>
                </div>
                <div className="w-4/6 p-5 border bg-white shadow-md rounded-[4px] border-gray-300">
                    <div className="text-xl font-bold mb-3">Create New Ticket</div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        {/* Input Topic */}
                        <input
                            type="text"
                            placeholder="Enter ticket topic..."
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="border border-gray-300 p-2 w-full rrounded-[4px]"
                            maxLength={100}
                        />

                        {/* Textarea Details */}
                        <textarea
                            placeholder="Describe your issue..."
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            className="border border-gray-300 p-2 w-full rounded-[4px] min-h-80 resize-none"
                            maxLength={500}
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-[4px] inline-block"
                        >
                            Submit Ticket
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTicketForm;
