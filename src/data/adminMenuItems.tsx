// src/data/menuItems.tsx
import React from 'react';
import { ChartLine, AppWindow } from "lucide-react";

export interface SubMenuItem {
  title: string;
  href: string;
}

export interface MenuItem {
  title: string;
  titleIcons: JSX.Element;
  titleHref: string;
  items: SubMenuItem[];
}
export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    titleIcons: <ChartLine />,
    titleHref: "/dashboard",
    items: [
      { title: "OverAll", href: "/admin/dashboard" },
      { title: "Orders", href: "/admin/dashboard/orders" },
      { title: "Incomes", href: "/admin/dashboard/incomes" },
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
      { title: "Feedback", href: "/admin/manage/feedbacks" },
      { title: "Users", href: "/admin/manage/users" }
    ]
  },
];
