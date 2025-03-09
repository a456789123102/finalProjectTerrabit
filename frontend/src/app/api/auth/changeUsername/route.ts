import { type NextRequest, NextResponse } from 'next/server';
import { patch } from "../../const";  

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const token = req.cookies.get("token")?.value; 
    const res = await patch("/api/auth/changeUsername", body,token);  
    const data = await res.json();
    return new NextResponse(data, { status: res.status });
  } catch (error) {
    console.error("Server error:", error); 
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
