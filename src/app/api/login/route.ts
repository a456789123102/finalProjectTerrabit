import { type NextRequest, NextResponse } from 'next/server';
import { post } from "../const";  // นำเข้า post function ที่ใช้เรียก Backend Server จริง

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Request Body:", body);  

    const res = await post("/api/auth/login", body);  
    console.log("Response from Backend:", res);  

    const data = await res.json();
    if (!data.token) {
      throw new Error("Token is missing from the response.");
    }

    // ตั้งค่า token ลงใน cookies
    const response = new NextResponse(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const options: any = {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === 'production' ? true : false,
    };

    response.cookies.set("token", data.token, options);

    return response;
  } catch (error) {
    console.error("Server error:", error);  // ตรวจสอบข้อผิดพลาด
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
