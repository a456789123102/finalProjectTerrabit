import React from "react";
import UseFetchWeeklySaleForCharts from "../../hooks/orders/useFetchWeeklySaleForCharts";
import useFetchWeeklyUserForCharts from "../../hooks/users/useFetchWeeklyUserForCharts";
import TopPieChartBox from "./topPieChartBox";
import UseFetchWeeklyRatingForCharts from "../../hooks/reviews/UseFetchWeeklyRatingForCharts";

function TopDashboard() {
  // เรียกใช้ Hook เพื่อดึงข้อมูล
  const { orderChartsData, totalOrders, lastWowOrders, totalIncome, lastWowIncomes } = UseFetchWeeklySaleForCharts();
  const { userChartsData, totalUsers, lastWowUsers } = useFetchWeeklyUserForCharts();
  const { reviewChartsData,
    totalReviewer,
    totalRating,
    lastWowRatings,
    lastWowReviewer, } = UseFetchWeeklyRatingForCharts();
    
  const Data = [
    {
      chartsData: orderChartsData,
      keyData: "totalIncome",
      color: "#0ba82a",
      headerText: "Total Income",
      amount: totalIncome, // ✅ ใช้ค่าที่ดึงมาได้
      wow: lastWowIncomes,
    }, {
      chartsData: orderChartsData,
      keyData: "totalOrders",
      color: "#FFAD60",
      headerText: "Total Orders",
      amount: totalOrders, // ✅ ใช้ค่าที่ดึงมาได้
      wow: lastWowOrders,
    }, {
      chartsData: userChartsData,
      keyData: "total",
      color: "#06c1b5",
      headerText: "Total Users",
      amount: totalUsers,
      wow: lastWowUsers,
    },{
      chartsData: reviewChartsData,
      keyData: "totalUserRatings",
      color: "#c6b809",
      headerText: "Total Paticipations",
      amount: totalReviewer,
      wow: lastWowReviewer,
    }
  ]

  return (
    <div className="col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {/* Income first */}
      {Data.map((d) => (
        <div className="h-auto ">
          <TopPieChartBox
            chartsData={d.chartsData}
            keyData={d.keyData}
            headerText={d.headerText}
            amount={d.amount}
            wow={d.wow}
            color={d.color}
          />
        </div>

      ))}

    </div>
  );
}

export default TopDashboard;
