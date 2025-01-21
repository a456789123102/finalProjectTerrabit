import { NextRequest, NextResponse } from 'next/server';
import { patch } from '@/app/api/const';

export const config = {
    runtime: "nodejs", 
  };

  export async function PATCH(req: NextRequest, { params }: { params: { id: number } }) {

    try {
      const { id } = params;
      const token = req.cookies.get("token")?.value;
      const res = await patch(`/api/slipImage/${id}/delete`,{}, token);
      const data = await res.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error("Server error:", error);
      return NextResponse.json({ error: "clear slip image failed" }, { status: 500 });
    }
  }
  