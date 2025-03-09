import { NextRequest, NextResponse } from "next/server";
import { patch } from "@/app/api/const";

export async function PATCH(req: NextRequest, { params }: { params: { status: string } }) {
    try {
      const id = params.status; 
      console.log(`Received id: ${id}`);
      const body = await req.json(); 
      
      const token = req.cookies.get("token")?.value; // ดึง token จาก cookies
      const res = await patch(`/api/order/${id}/userUpdateStatus`, body, token); // ส่ง request ภายนอก
      const data = await res.json();
      
      return NextResponse.json(data);
    } catch (error) {
      console.error("Error in PATCH handler:", error);
      return NextResponse.json({ error: "Update order failed" }, { status: 500 });
    }
  }
  