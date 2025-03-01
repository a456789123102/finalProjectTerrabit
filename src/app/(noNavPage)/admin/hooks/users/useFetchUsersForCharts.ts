import { getTotalUsersForCharts } from '@/app/apis/user';
import React, { useEffect, useState } from 'react'

function useFetchUsersForCharts(interval: string, startDate: Date, endDate: Date) {
        const [chartsData, setChartsData] = useState<any[]>([]);
        const [totalActiveUsers, setTotalActiveUsers] = useState(0);
        const [totalinActiveUsers, setTotalinActiveUsers] = useState(0);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);
    
    const fetchReviews = async() =>{
        try {
            setLoading(true);
            setError(null); 
const data = await getTotalUsersForCharts(interval, startDate, endDate);
console.log("data:",data);
            setChartsData(data.data || []);
            setTotalActiveUsers(data.totalActiveUsers || 0);
            setTotalinActiveUsers(data.totalinActiveUsers || 0);
            setLoading(false);
    } catch (err) {
            console.error("Error fetching reviews data for charts:", err);
            setError("Failed to fetch reviews data");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() =>{fetchReviews()},[interval,startDate,endDate]);

    return { chartsData,totalActiveUsers,totalinActiveUsers,loading,error };
}

export default useFetchUsersForCharts