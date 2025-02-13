import React, { useEffect, useState } from 'react'
import { AppWindow } from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation' // ใช้ Next.js API ดึง path
import { useTheme } from '@/app/context/themeContext';

// 🟢 Type สำหรับเมนูย่อย
interface SubMenuItem {
    title: string;
    href: string;
}

// 🟢 Type สำหรับเมนูหลัก
interface MenuItem {
    title: string;
    titleIcons: JSX.Element;
    titleHref: string;
    items: SubMenuItem[];
}

// 🟢 รายการเมนู
const menuItems: MenuItem[] = [
    {
        title: "Dashboard",
        titleIcons: <AppWindow />,
        titleHref: "/dashboard",
        items: [
          { title: "OverAll", href: "/admin/dashboard" },
            { title: "Orders", href: "/admin/dashboard/orders" },
            { title: "Incomes (not done)", href: "/admin/dashboard/incomes" },
            { title: "Feedback (not done)", href: "/admin/dashboard/userfeedback" },
            { title: "Users (not done)", href: "/admin/dashboard/users" }
        ]
    },
    {
        title: "Manage",
        titleIcons: <AppWindow />,
        titleHref: "/",
        items: [
            { title: "Purchase Orders", href: "/admin/manage/purchase" },
            { title: "Products", href: "/admin/manage/product" },
            { title: "Feedback (not done)", href: "/admin/manage/userfeedback" },
            { title: "Users(not)", href: "/admin/manage/users" }
        ]
    },
]

const SideMenu: React.FC = () => {
    const { theme, themeColors } = useTheme();
    const [openMenus, setOpenMenus] = useState<number[]>([]);
    const pathname = usePathname(); // ✅ ดึง path ปัจจุบันจาก Next.js

    useEffect(() => {
        const openAll = menuItems.map((_, index) => index); 
        setOpenMenus(openAll);
    }, []);

    const toggleMenu = (index: number) => {
        setOpenMenus((prev) => 
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    return (
        <div className='mt-5 text-sm w-full border flex justify-center flex-col items-center'>
            {menuItems.map((item, index) => (
                <div key={index} className='flex flex-col  border w-full items-center '>
                    {/* 🔹 Title คลิกเพื่อเปิด/ปิดเมนู */}
                    <div 
                        className='text-[1rem] flex flex-row gap-2 items-center p-2  w-full cursor-pointer border-gray-300'
                        style={{ backgroundColor: themeColors.secondary,}}
                        onClick={() => toggleMenu(index)} 
                    >
                        {item.titleIcons}
                        <div>{item.title}</div>
                    </div>

                    {/* 🔹 แสดงเมนูย่อยเฉพาะที่เปิดอยู่ */}
                    {openMenus.includes(index) && (
                        <div className='w-full'>
                            {item.items.map((subItem, subIndex) => (
                                <div 
                                    className={`py-2 px-11 w-full border ${
                                        pathname === subItem.href ? "border-blue-500 font-bold" : "border-b-gray-300"
                                    }`}
                                    style={{color:pathname === subItem.href ? themeColors.hoverText:themeColors.text}}
                                    key={subIndex}
                                >
                                    <Link  href={subItem.href}>{subItem.title}</Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default SideMenu;
