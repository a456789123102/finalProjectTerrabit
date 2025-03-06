
import React, { useState } from "react";
import { menuItems, MenuItem } from "@/data/adminMenuItems"; 
import { Search } from "lucide-react";
import { useTheme } from "@/app/context/themeContext";
import { useRouter } from "next/navigation";

const AdminSearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { themeColors } = useTheme();
  const router = useRouter();

  const filteredItems = menuItems.flatMap((menu: MenuItem) =>
    menu.items
      .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((item) => ({
        ...item,
        parentTitle: menu.title,
      }))
  );

  const handleSearch = (href?: string) => {
    if (href || filteredItems.length > 0) {
      router.push(href || filteredItems[0].href); // ถ้าไม่มี href ให้ใช้อันแรก
      setSearchTerm(""); // เคลียร์ค่า Search
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search menu..."
          className="h-8 pr-10 pl-2 border border-gray-800 text-black w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        {/* Search Icon */}
        <Search
          className="text-gray-500 absolute right-3 cursor-pointer"
          onClick={() => handleSearch()}
        />
      </div>

      {searchTerm && filteredItems.length > 0 && (
        <div className="absolute left-0 right-0 bg-white border mt-1 z-50">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSearch(item.href)}
            >
              {item.title} ({item.parentTitle})
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
