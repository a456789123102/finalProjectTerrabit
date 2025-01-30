"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // ✅ ใช้ usePathname() ได้ใน Next.js 14+
import { useUserStore } from "@/store/zustand";
import AdminNavbar from "./components/adminNavbar";
import AdminSidebar from "./components/adminSidebar";
import { ThemeProvider, useTheme } from "@/app/context/themeContext";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { username, isAdmin } = useUserStore();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isScrollDown, setIsScrollDown] = useState(false); 

  if (!username) {
    const currentPath = encodeURIComponent(window.location.pathname);
    router.push(`/login?redirect=${currentPath}`);
    return;
  }
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrollDown(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <ThemeProvider>
      <LayoutWithTheme
        toggleSidebar={() => setIsSidebarVisible((prev) => !prev)}
        isScrollDown={isScrollDown}
        isSidebarVisible={isSidebarVisible}
      >
        {children}
      </LayoutWithTheme>
    </ThemeProvider>
  );
}

function LayoutWithTheme({
  children,
  toggleSidebar,
  isScrollDown,
  isSidebarVisible,
}: {
  children: React.ReactNode;
  toggleSidebar: () => void;
  isScrollDown: boolean;
  isSidebarVisible: boolean;
}) {
  const { themeColors } = useTheme();
  return (
    <div
      className="relative min-h-screen"
      style={{ color: themeColors.text, backgroundColor: themeColors.navbar }}
    >
      <AdminNavbar toggleSidebar={toggleSidebar} isScrollDown={isScrollDown} />
      <div className="flex flex-row">
        <AdminSidebar isSidebarVisible={isSidebarVisible} isScrollDown={isScrollDown} />
        <div
          className={`transition-all duration-300 ${
            isSidebarVisible ? "w-[calc(100%-16.6%)] ml-[16.6%]" : "w-full"
          } ${isScrollDown ? "mt-12" : "mt-0"}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
