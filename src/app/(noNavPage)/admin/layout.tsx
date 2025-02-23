"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ❌ ไม่ใช้ usePathname() แล้ว
import { useUserStore } from "@/store/zustand";
import AdminNavbar from "./components/adminNavbar";
import AdminSidebar from "./components/adminSidebar";
import { ThemeProvider, useTheme } from "@/app/context/themeContext";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { username, isAdmin } = useUserStore();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // ✅ ป้องกัน Redirect ทันที

  useEffect(() => {
    if (username === undefined) {
      console.log("⏳ Loading Zustand state...");
      return; 
    }

    if (!username) {
      console.log("🔴 User not logged in. Redirecting...");
      const currentPath = encodeURIComponent(window.location.pathname);
      router.replace(`/login?redirect=${currentPath}`);
    } else if (!isAdmin) {
      console.log("🚫 User is not an admin. Redirecting to home...");
      router.replace("/"); // 🔥 ถ้าไม่ใช่ Admin ให้เด้งไปหน้าหลัก
    } else {
      console.log("✅ Authenticated as Admin, rendering page.");
      setIsCheckingAuth(false);
    }
  }, [username, isAdmin, router]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollDown(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isCheckingAuth) return <p>Loading...</p>;

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
      style={{ color: themeColors.text, backgroundColor: themeColors.bg }}
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
