"use client";
import React, { useState } from "react";
import MyAccount from "../components/MyAccount";
import AccDetails from "../components/AccDetails";
import PurchaseTable from "../components/PurchaseTable";

function Page() {
  const [menuClick, setMenuClick] = useState("My Account");

  const rightMenu = [
    { name: "My Account", component: <MyAccount /> },
    { name: "Details", component: <AccDetails /> },
    { name: "Purchase history", component: <PurchaseTable /> },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="border border-gray-300 flex flex-row p-5 w-4/5 items-start shadow-md bg-white rounded-lg">
        
        {/* ✅ Left Menu Side */}
        <div className="flex flex-col w-1/4 bg-white border-r p-3">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Settings</h2>
          {rightMenu.map((item, index) => (
            <div
              key={index}
              className={`p-3 cursor-pointer transition-all duration-300 rounded-md 
                ${
                  item.name === menuClick
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              onClick={() => setMenuClick(item.name)}
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="w-3/4 p-1 bg-white min-h-96">
          {rightMenu.find((item) => item.name === menuClick)?.component}
        </div>
      </div>
    </div>
  );
}

export default Page;
