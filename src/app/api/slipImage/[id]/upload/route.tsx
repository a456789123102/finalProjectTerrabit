import { NextRequest, NextResponse } from 'next/server';
import { post } from "../../../const";

export const config = {
  runtime: "nodejs", 
};

  
  export async function POST(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const formData = await req.formData();
        const file = formData.get('image'); // 'image' คือ key ที่ Client ส่งมา
        if (!file || !(file instanceof File)) {
          return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
        }
        const { id } = params;
        const token = req.cookies.get("token")?.value;
        const res = await post(`/api/slipImage/${id}/upload`, formData, token);
        const data = await res.json();
        return NextResponse.json(data,{status:res.status});

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Upload slip image failed" }, { status: 500 });
    }
  }