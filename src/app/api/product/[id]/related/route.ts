import { NextRequest, NextResponse } from 'next/server';
import { get } from "../../../const";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const queryParams = req.nextUrl.searchParams;
    const { id } = params;

    // ดึงค่า category และ name จาก query parameters
    const category = queryParams.get('category'); 
    const name = queryParams.get('name');

    if (!category || !name) {
      return NextResponse.json(
        { message: "Invalid parameters" },
        { status: 400 }
      );
    }

    const paramsObject = {
      category: category,
      name: name,
    };

    // ใช้ get function เพื่อส่ง request
    const res = await get(`/api/product/${id}/related`, "", paramsObject);

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch related products" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error handling related products:", error);
    return NextResponse.json(
      { message: "Failed to fetch related products" },
      { status: 500 }
    );
  }
}
