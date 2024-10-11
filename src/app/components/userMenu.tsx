'use client'
import { useUserStore } from "@/store/zustand";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useRouter } from 'next/navigation'; // Import useRouter สำหรับการนำทาง
import {me} from '../apis/user'
import { useEffect } from "react";
import { logout } from "../apis/auth";

export default function UserMenu() {
  const router = useRouter(); 
  const { username, setUser, clearUser } = useUserStore(); 

  useEffect(() => {
    if (!username) { 
      me() 
        .then((data) => {
          setUser(data); 
        })
        .catch(() => {
          //router.push("/login"); 
        });
    }
  }, [setUser, username, router]); 

  const handleLogout = async () => {
    await logout(); 
    clearUser(); 
    router.push("/login"); 
  };


  const items = [
    {
      key: "profile",
      label: "My Profile",
      path: "/me" // เส้นทางเมื่อคลิก "My Profile"
    },
    {
      key: "Create Product",
      label: "Create Product",
      path: "/product/create" // เส้นทางเมื่อคลิก "Copy link"
    },
    {
      key: "edit",
      label: "Edit file",
      path: "/edit-file" // เส้นทางเมื่อคลิก "Edit file"
    },
    {
      key: "Logout",
      label: "Logout",
      onClick : handleLogout
    }
  ];

  const handleAction = (path: string) => {
    router.push(path); // ใช้ path ที่กำหนดในแต่ละ item เพื่อนำทาง
  };

  return (
    username ? (
      <div className="text-yellow-600 hover:bg-orange-100 cursor-pointer">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">
              User Menu
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Dynamic Actions"
            items={items}
            className="bg-[#040D12] text-yellow-600  shadow-md rounded-lg"
          >
            {items.map((item) => (
              <DropdownItem
                key={item.key}
                className="hover:bg-orange-100"
                onClick={() => item.onClick ? item.onClick() : handleAction(item.path)}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    ) : (
      <div>Please login</div>
    )
  );
  
}
