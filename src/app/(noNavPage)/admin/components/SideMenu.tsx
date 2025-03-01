import React, { useEffect, useState } from 'react'
import { AppWindow, ChartLine, CornerRightUp, CornerRightDown, ChevronRight } from "lucide-react"
import { usePathname } from 'next/navigation' // ใช้ Next.js API ดึง path
import { useTheme } from '@/app/context/themeContext';
import { useRouter } from 'next/navigation';
import { menuItems, MenuItem } from "@/data/adminMenuItems";

const SideMenu: React.FC = () => {
    const { theme, themeColors } = useTheme();
    const [openMenus, setOpenMenus] = useState<number[]>([]);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const openAll = menuItems.map((_, index) => index);
        setOpenMenus(openAll);
    }, []);

    const toggleMenu = (index: number) => {
        setOpenMenus((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const handleMenuClick = (href: string) => () => {
        router.push(href)
    };

    return (
<div className="mt-5 text-sm w-full flex justify-center flex-col items-center">
  {menuItems.map((item, index) => (
    <div key={index} className="flex flex-col border-y w-full items-center">
      <div
        className="text-[1rem] flex flex-row gap-2 items-center p-3 justify-between w-full cursor-pointer bg-blue-400 border-2 border-blue-600 text-white"
        onClick={() => toggleMenu(index)}
      >
        <div className="flex flex-row gap-2">
          {item.titleIcons}
          <div>{item.title}</div>
        </div>
        <div>{openMenus.includes(index) ? <CornerRightDown /> : <CornerRightUp />}</div>
      </div>
      {/* Container สำหรับเมนูย่อย */}
      <div
        className={`w-full overflow-hidden transition-all duration-300 delay-50 ${
          openMenus.includes(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {item.items.map((subItem, subIndex) => (
          <div
            key={subIndex}
            
            className={`py-3 text-[0.9rem] pl-11 pr-3 flex flex-row justify-between w-full  ${
              pathname === subItem.href ? "border border-blue-400 font-bold" : "border-b border-gray-200"
            }`}
            style={{ color: pathname === subItem.href ? themeColors.hoverText : themeColors.text }}
          >
            <div className="hover:text-yellow-600 cursor-pointer" onClick={handleMenuClick(subItem.href)}>{subItem.title}</div>
            {pathname === subItem.href && <ChevronRight />}
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

    )
}

export default SideMenu;
