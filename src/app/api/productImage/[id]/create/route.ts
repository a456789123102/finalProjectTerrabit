import { NextResponse, NextRequest } from "next/server";
import { post } from "@/app/api/const";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const formData = await req.formData(); // รับ FormData จากคำขอ
    const productId = params.id; // ดึง productId จาก params
    const token = req.cookies.get("token")?.value; // รับ token จาก cookies

    // ส่งคำขอไปยัง backend
    const res = await post(`/api/productImage/${productId}/create`, formData, token);
    const data = await res.json();

    return NextResponse.json(data,{status:res.status});
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Error uploading image" }, { status: 500 });
  }
}
