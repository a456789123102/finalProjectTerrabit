"use client"
import React, { useEffect, useState } from "react";
import MyAccount from "../components/MyAccount";
import AccDetails from "../components/AccDetails";
import PurchaseTable from "../components/PurchaseTable";
import { myInfo } from "@/app/apis/user";

function Page() {
  const [menuClick, setMenuClick] = useState("My Account");
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMydata = async () => {
      try {
        const data = await myInfo();
        console.log("Fetched Data:", data);
        setUser(data.users);
        setInfo(data.details);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMydata();
  }, []);

  const rightMenu = [
    { name: "My Account", component: user ? <MyAccount user={user} /> : <p>Loading...</p> },
    { name: "Details", component: info ? <AccDetails info={info} /> : <p>Loading details...</p> },
  ];
  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="border border-gray-300 flex flex-row p-5 w-[100vh] min-w-96  items-start shadow-md bg-white rounded-lg">
        
        {/* ✅ Left Menu Side */}
        <div className="flex flex-col w-1/4 bg-white border-r border-gray-400 pb-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Settings</h2>
          {rightMenu.map((item, index) => (
            <div
              key={index}
              className={`p-3 cursor-pointer transition-all duration-300 rounded-l-lg 
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
