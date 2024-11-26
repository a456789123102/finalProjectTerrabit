'use client';

import { useUserStore } from "@/store/zustand";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation'; // Import useRouter สำหรับการนำทาง
import { me } from '../apis/user'
import { useEffect } from "react";
import { logout } from "../apis/auth";
import Link from "next/link";

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
      onClick: handleLogout
    }
  ];

  const handleAction = (path: string) => {
    router.push(path); // ใช้ path ที่กำหนดในแต่ละ item เพื่อนำทาง
  };

  return (
    username ? (
      <div className="flex flex-row justify-center items-center w-full text-yellow-600 ">
        <Dropdown >
          <DropdownTrigger>
            <Button variant="bordered" className=" hover:bg-orange-100 cursor-pointer justify-center items-center ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
              </svg>


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
        <div className=" hover:bg-orange-100 cursor-pointer w-full flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>

        </div>
      </div>
    ) : (
      <Link href={'/login'}>Please login</Link>
    )
  );

}
