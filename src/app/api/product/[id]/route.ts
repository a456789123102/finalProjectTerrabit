// import { NextRequest, NextResponse } from 'next/server';
// import { get } from "../../const";

// export async function GET(req: NextRequest) {
//     try {
//         const  id  = req.nextUrl.searchParams;
//         const res = await get(`/api/product/${id}`);
//         const data = await res.json();
//         return NextResponse.json(data);
//     } catch (error) {
//         console.error("Server error:", error);
//         return NextResponse.json({ error: "Failed to get products" }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from 'next/server';
import { get } from "../../const";

export async function GET(req: NextRequest, { params }) {
  try {
    const { id } = params; // ดึง id จาก URL params

    // เรียก backend API จริงด้วย id ที่ได้รับมา
    const res = await get(`/api/product/${id}`);

    // ตรวจสอบสถานะการตอบกลับจาก backend
    if (!res.ok) {
      throw new Error(`Failed to fetch product with ID ${id}`);
    }

    const data = await res.json();
    return NextResponse.json(data); // ส่งข้อมูลกลับเป็น JSON
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Failed to get product" }, { status: 500 });
  }
}