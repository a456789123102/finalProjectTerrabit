import { NextRequest, NextResponse } from "next/server";
import { get } from "../../const";


export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    // ส่ง searchParams ตรง ๆ โดยไม่ต้องประกอบใหม่
    const res = await get(`/api/order/all?${req.nextUrl.searchParams.toString()}`, token);

    const data = await res.json();
    return NextResponse.json(data,{status:res.status}); //
  } catch (error) {
    console.error("Error fetching orders from backend", error);
    return NextResponse.error();
  }
}
export const dynamic = 'force-dynamic';