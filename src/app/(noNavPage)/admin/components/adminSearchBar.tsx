// src/components/SearchBar.tsx
import React, { useState } from "react";
import { menuItems, MenuItem } from "@/data/adminMenuItems"; // ปรับ path ให้ถูกต้องตามโครงสร้างโปรเจคของคุณ
import { Search } from "lucide-react";
import { useTheme } from "@/app/context/themeContext";

const AdminSearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { themeColors } = useTheme();

  const filteredItems = menuItems.flatMap((menu: MenuItem) =>
    menu.items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  

  return (
<div className="relative w-full">
  <div className="flex items-center w-full">
    <Search className="text-gray-500 absolute right-3"/>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search menu..."
      className="h-8 pr-10 pl-2 border border-gray-800 text-black w-full" 
/>
  </div>
  {searchTerm && filteredItems.length > 0 && (
    <div className="absolute left-0 right-0 bg-white border mt-1 z-50 ">
      {filteredItems.map((item, index) => (
        <div
          key={index}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  )}
  {searchTerm && filteredItems.length === 0 && (
    <div className="absolute left-0 right-0 bg-white border mt-1 z-50 rounded shadow p-2">
      No Matching Results
    </div>
  )}
</div>

  );
};

export default AdminSearchBar;
