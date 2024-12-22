import { NextRequest, NextResponse } from "next/server";
import { get } from "@/app/api/const";

export async function GET(
  req: NextRequest,
  { params }: { params: { status: string } }
) {
  try {
    const { status } = params;
    console.log(`status from params: ${status}`);

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Token not found" }, { status: 401 });
    }

    const data = await get(`/api/order/${status}/myOrder`, token);

    // Debug Response ก่อนส่งกลับไปยัง Frontend
    console.log("Data fetched from external API:", JSON.stringify(data, null, 2));

    return NextResponse.json({ orders: data }); // ยังคงส่งข้อมูลในรูปแบบ `{ orders: [...] }`
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Failed to get my order" }, { status: 500 });
  }
}
