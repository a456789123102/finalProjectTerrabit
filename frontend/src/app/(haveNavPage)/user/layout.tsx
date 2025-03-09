"use client";
import React, { useEffect } from 'react'
import { useUserStore } from "@/store/zustand";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from 'react'

function Layout({ children }: PropsWithChildren) {
  const { username} = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (username === undefined) {
      console.log(" Loading Zustand state...");
      return; 
    }

    if (!username) {
      console.log("User not logged in. Redirecting...");
      const currentPath = encodeURIComponent(window.location.pathname);
      router.replace(`/login?redirect=${currentPath}`);
    } 
  }, [username, router]);

  return (
    <div className="bg-gray-100 w-full min-h-screen">
      {children}  
    </div>
  );
}

  
  export default Layout;
