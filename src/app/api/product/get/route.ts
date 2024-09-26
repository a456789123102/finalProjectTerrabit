// src/app/api/product/get/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { get } from "../../const"; // ตรวจสอบเส้นทางที่ถูกต้อง

export const runtime = 'edge'; // เปลี่ยนเป็น edge runtime ตามคำแนะนำ

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const searchParams = req.nextUrl.searchParams;

    // ใช้ URL ที่ถูกต้องในการเรียก API Backend
    const res = await get('/product', token, {
      search: searchParams.get('search'),
      category: searchParams.getAll('category'),
    });

    const data = await res.json();
    return NextResponse.json(data); // ส่งข้อมูลกลับเป็น JSON
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Failed to get products" }, { status: 500 });
  }
}
