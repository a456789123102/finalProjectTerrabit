import { NextRequest, NextResponse } from "next/server";
import { get } from "../../const";

export async function GET(req: NextRequest, { params }:{params:{id:string}}) {
  try {
    const { id } = params;
    const res = await get(`/api/career/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch career with ID ${id}`);
    }
    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store", // ป้องกันไม่ให้เก็บแคช
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to get careers" },
      { status: 500 }
    );
  }
}
