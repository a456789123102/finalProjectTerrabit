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
    const { id } = params;

    const res = await get(`/api/product/${id}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch product with ID ${id}`);
    }

    const data = await res.json();

    // ส่งข้อมูลกลับโดยไม่ใช้แคช
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store',  // ป้องกันไม่ให้เก็บแคช
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Failed to get product" }, { status: 500 });
  }
}