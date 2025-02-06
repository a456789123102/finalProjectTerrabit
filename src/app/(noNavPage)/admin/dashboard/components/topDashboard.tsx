import React from "react";
import UseFetchWeeklySaleForCharts from "../../hooks/orders/useFetchWeeklySaleForCharts";
import TopPieChartBox from "./topPieChartBox";

function TopDashboard() {
  // เรียกใช้ Hook เพื่อดึงข้อมูล
  const { chartsData, totalOrders, lastWowOrders, totalIncome, lastWowIncomes } = UseFetchWeeklySaleForCharts();

  // กำหนดค่าที่ต้องการใช้
  const incomeData = {
    chartsData: chartsData,
    keyChartsData: ["totalIncome"],
    headerText: "Total Income",
    amount: totalIncome, // ✅ ใช้ค่าที่ดึงมาได้
    wow: lastWowOrders,
  };

  return (
    <div className="col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Income first */}
      <TopPieChartBox 
        chartsData={chartsData}
        headerText={incomeData.headerText}
        amount={incomeData.amount}
        wow={incomeData.wow} 
      />
    </div>
  );
}

export default TopDashboard;
