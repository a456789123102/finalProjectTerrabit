'use client';

import { useUserStore } from "@/store/zustand";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation'; 
import { logout } from "../apis/auth";
import {LogOut, User} from "lucide-react"

import { useState } from "react";

export default function UserMenu() {
  const router = useRouter();
  const { username, clearUser } = useUserStore();
    const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    clearUser(); 
  };

  const items = [
    {
      key: "profile",
      label: "Profile (not done)",
      path: "/user/profile" 
    },
    {
      key: "MyCarts",
      label: "My Carts",
      path: "/cart/myCart"
    },
    {
      key: "My Purchase",
      label: "My Purchase",
      path: "/user/purchase"
    },
    {
      key: "MyAddresses",
      label: "My Addresses",
      path: "/address/myAddress"
    },
    {
      key: "Logout",
      label: (
        <div className="flex items-center gap-2 bg-red-50 text-red-500">
          <LogOut size={16} /> Logout
        </div>
      ),
      onClick: handleLogout,
      className: "text-red-500 hover:bg-red-100"
    }
  ];

  const handleAction = (path: string) => {
    router.push(path); 
  };

  return (
    <div className="flex flex-row items-center text-yellow-500 hover:bg-orange-100">
    <Dropdown isOpen={isOpen}>
        <DropdownTrigger>
          <Button variant="bordered"
           onMouseEnter={() => {
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            setIsOpen(false);
          }}
           >
<User />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          className="bg-white text-yellow-600 shadow-md py-2"
          onMouseEnter={() => {
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            setIsOpen(false);
          }}
        >
          {items.map((item) => (
            <DropdownItem
              key={item.key}
              className={`hover:bg-orange-100 py-1 flex items-center gap-2 ${item.className || ""}`}
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
