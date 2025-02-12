import { NextRequest, NextResponse } from 'next/server';
import { get } from "../../const";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    // ส่งพารามิเตอร์ไปยัง backend จริง
    const res = await get(`/api/product?${req.nextUrl.searchParams.toString()}`, token);

    const data = await res.json();
    return NextResponse.json(data); // ส่งข้อมูลกลับเป็น JSON
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Failed to get products" }, { status: 500 });
  }
}
