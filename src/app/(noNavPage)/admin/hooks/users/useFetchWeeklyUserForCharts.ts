import { useState, useEffect } from "react";
import { fetchgetWeeklyUserForCharts } from "@/app/apis/user";
import React from "react";

function useFetchWeeklyUserForCharts() {
  const [userChartsData, setUserChartsData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [lastWowUsers, setLastWowUsers] = useState(0);

  const fetchData = async () => {
    const data = await fetchgetWeeklyUserForCharts();
    setUserChartsData(data.data);
    setTotalUsers(data.totalUsers);
    setLastWowUsers(data.wow);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    userChartsData,
    totalUsers,
    lastWowUsers,
  };
}

export default useFetchWeeklyUserForCharts;
