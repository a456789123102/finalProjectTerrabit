import { NextRequest, NextResponse } from "next/server";
import { get } from "@/app/api/const";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Token not found" }, { status: 401 });
    }

    const res = await get(
      `/api/order/myOrder?${req.nextUrl.searchParams.toString()}`,
      token
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch data" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to get my order" },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';