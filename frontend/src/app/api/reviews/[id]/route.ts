import { NextRequest, NextResponse } from "next/server";
import { get } from "../../const"; // ดึงฟังก์ชัน get

export async function GET(req: NextRequest, {params}:{params:{id:string}}) {
  try {
    const { id } = params;
    const token = req.cookies.get("token")?.value;
    const query = req.nextUrl.searchParams.toString();

    const res = await get(`/api/reviews/${id}?${query}`, token);
    if (!res.ok) {
      throw new Error(`Failed to fetch review with ID ${id}, query: ${query}`);
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store", // ป้องกันแคช
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Failed to get review" }, { status: 500 });
  }
}
