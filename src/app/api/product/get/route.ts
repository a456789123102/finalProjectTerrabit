import { NextRequest, NextResponse } from 'next/server';
import { get } from "../../const";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const searchParams = req.nextUrl.searchParams;

    // ดึงค่าพารามิเตอร์ search และ category
    const search = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;
    const page = searchParams.get('page') || undefined;

    // ส่งพารามิเตอร์ไปยัง backend เฉพาะเมื่อมีค่า
    const params: any = {};
    if (search) {
      params.search = search;
    }
    if (category) {
      params.category = [parseInt(category)];
    }if(page){
      params.page = parseInt(page);
    }

    // ส่งพารามิเตอร์ไปยัง backend จริง
    const res = await get('/api/product', token, params);

    const data = await res.json();
    return NextResponse.json(data); // ส่งข้อมูลกลับเป็น JSON
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Failed to get products" }, { status: 500 });
  }
}
