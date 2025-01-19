'use client';

import { useUserStore } from "@/store/zustand";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation'; // Import useRouter สำหรับการนำทาง
import { logout } from "../apis/auth";

export default function UserMenu() {
  const router = useRouter();
  const { username, clearUser } = useUserStore();

  const handleLogout = async () => {
    await logout();
    clearUser();  // ล้างข้อมูลผู้ใช้จาก store
    router.push("/login"); // เปลี่ยนหน้าไปที่หน้า login
  };

  const items = [
    {
      key: "profile",
      label: "My Profile",
      path: "/user/account/profile" // เส้นทางเมื่อคลิก "My Profile"
    },
    {
      key: "My Purchase",
      label: "My Purchase",
      path: "/user/purchase" // เส้นทางเมื่อคลิก "My Purchase"
    },
    {
      key: "Notification",
      label: "Notification",
      path: "/notification" // เส้นทางเมื่อคลิก "Notification"
    },
    {
      key: "Logout",
      label: "Logout",
      onClick: handleLogout // ฟังก์ชัน logout
    }
  ];

  const handleAction = (path: string) => {
    router.push(path); // ใช้ path ที่กำหนดในแต่ละ item เพื่อนำทาง
  };

  return (
    <div className="flex flex-row items-center text-yellow-600 h-full justify-end">
      <Dropdown >
        <DropdownTrigger>
          <Button variant="bordered">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" size-6 hover:size-7  hover:bg-orange-100 cursor-pointer w-full flex justify-center items-center">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          className="bg-white text-yellow-600 shadow-md py-2"
        >
          {items.map((item) => (
            <DropdownItem
              key={item.key}
              className="hover:bg-orange-100 py-1"
              onPress={() => item.onClick ? item.onClick() : handleAction(item.path)}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
