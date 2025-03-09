import { myTickets } from "@/app/apis/ticket";
import { useState, useEffect } from "react";



const useFetchTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTicketList = async () => {
    setLoading(true);
    try {
        const TicketsData = await myTickets(
            "",     
            "",      
            "",     
            "",   
            "1",      
            "5"       
          );
          
          setTickets(TicketsData.tickets);
      console.log("Tickets Data :",TicketsData)
      setError(null);
    } catch (error) {
      console.error("Error fetching Users", error);
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketList();
  }, []);

  return {tickets,loading,error };
};

export default useFetchTickets;
