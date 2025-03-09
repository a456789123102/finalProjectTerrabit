import { NextRequest, NextResponse } from "next/server";
import { patch } from "../../../const"; // ใช้ method เดียวกับ POST

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.cookies.get("token")?.value;
    const body = await req.json();
    const { id } = params;

    // ทำให้เหมือน `POST`
    const res = await patch(`/api/reviews/${id}/edit`, body, token); 
    const data = await res.json();

    return NextResponse.json(data,{status:res.status});
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Update review failed" }, { status: 500 });
  }
}
