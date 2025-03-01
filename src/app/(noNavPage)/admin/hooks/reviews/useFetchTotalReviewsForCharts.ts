import { getTotalReviewsForCharts } from '@/app/apis/review';
import React, { useEffect, useState } from 'react'

function useFetchTotalReviewsForCharts(interval: string, startDate: Date, endDate: Date) {
        const [chartsData, setChartsData] = useState<any[]>([]);
        const [totalComments, setTotalComments] = useState(0);
        const [averageRating, setAverageRating] = useState<boolean>(true);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);
    
    const fetchReviews = async() =>{
        try {
            setLoading(true);
            setError(null); 
const data = await getTotalReviewsForCharts(interval, startDate, endDate);
console.log("data:",data);
            setChartsData(data.data || []);
            setTotalComments(data.totalComments || 0);
            setAverageRating(data.averageRating || 0);
            setLoading(false);
    } catch (err) {
            console.error("Error fetching reviews data for charts:", err);
            setError("Failed to fetch reviews data");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() =>{fetchReviews()},[interval,startDate,endDate]);

    return { chartsData,totalComments,averageRating,loading,error };
}

export default useFetchTotalReviewsForCharts