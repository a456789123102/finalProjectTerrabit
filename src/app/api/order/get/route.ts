import { NextRequest, NextResponse } from "next/server";
import { get } from "../../const";

export async function GET(req: NextRequest) {
    try {
      const token = req.cookies.get("token")?.value;
  
      // ดึงค่า status จาก query string
      const searchParams = req.nextUrl.searchParams;
      const status = searchParams.getAll("status"); // รับค่า status ในรูปแบบ array
  
      const formattedParams: Record<string, string | string[]> = {};
      if (status.length > 0) {
        formattedParams.status = status; // ส่ง array status ไปยัง backend จริง
      }
  
      // ส่งไปยัง backend จริง
      const res = await get("/api/order/all", token, formattedParams);
  
      // ตรวจสอบ Response และแปลง JSON
      const data = await res.json();
  
      return NextResponse.json(data);
    } catch (error) {
      console.error("Server error:", error);
      return NextResponse.json({ error: "Failed to get order" }, { status: 500 });
    }
  }
  