import { NextRequest, NextResponse } from "next/server";
import { get } from "../../const";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const searchParams = req.nextUrl.searchParams;
    const statuses = searchParams.getAll("status");

    const backendParams = new URLSearchParams();
    statuses.forEach((status) => {
      backendParams.append("status", status);
    });

    const res = await get(`/api/order/all`, token,backendParams.toString());
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching orders from backend", error);
    return NextResponse.error();
  }
}
