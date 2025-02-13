import { getWeeklyRatingForCharts } from "@/app/apis/review";
import React, { useEffect, useState } from "react";

function UseFetchWeeklyRatingForCharts() {
  const [reviewChartsData, setReviewChartsData] = useState([]);
  const [totalReviewer, setTotalReviewer] = useState(0);
  const [totalRating, setTotalRating] = useState(0);
  const [lastWowRatings, setLastWowRatings] = useState(0);
  const [lastWowReviewer, setLastWowReviewer] = useState(0);

const fetchData = async () => {
    try {
      const data = await getWeeklyRatingForCharts();
      console.log("Fetched review data::::::::::::::::::::", data);
      setReviewChartsData(data.data);
      setTotalReviewer(data.totalReviewer);
      setTotalRating(data.totalRating);
      setLastWowRatings(data.lastWowRatings);
      setLastWowReviewer(data.lastWowReviewer);



    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    reviewChartsData,
    totalReviewer,
    totalRating,
    lastWowRatings,
    lastWowReviewer,
};
}

export default UseFetchWeeklyRatingForCharts;
