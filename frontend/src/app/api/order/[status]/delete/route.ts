import { NextRequest, NextResponse } from "next/server";
import { deleteRequest } from "@/app/api/const";

export async function DELETE(req: NextRequest, { params }: { params: { status: string} }) {
    try {
      const { status} = params;  // Destructure both status and id
      console.log(`Received status: ${status}`);
  
      const token = req.cookies.get("token")?.value;
      const res = await deleteRequest(`/api/order/${status}/delete`, token);  // Use status in the API call
      const data = await res.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error("Server error:", error);
      return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
    }
  }
  