import React from "react";
import UseFetchWeeklySaleForCharts from "../../hooks/orders/useFetchWeeklySaleForCharts";
import TopPieChartBox from "./topPieChartBox";

function TopDashboard() {
  // เรียกใช้ Hook เพื่อดึงข้อมูล
  const { chartsData, totalOrders, lastWowOrders, totalIncome, lastWowIncomes } = UseFetchWeeklySaleForCharts();

  // กำหนดค่าที่ต้องการใช้
  const Data = [
{
  chartsData: chartsData,
  keyData: "totalIncome",
  color: "#A02334",
  headerText: "Total Income",
  amount: totalIncome, // ✅ ใช้ค่าที่ดึงมาได้
  wow: lastWowIncomes,
},{
  chartsData: chartsData,
  keyData: "totalOrders",
  color: "#FFAD60",
  headerText: "Total Orders",
  amount: totalOrders, // ✅ ใช้ค่าที่ดึงมาได้
  wow: lastWowOrders,
}
  ]

  return (
    <div className="col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Income first */}
      {Data.map((d) => (
<div className="h-auto">
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
