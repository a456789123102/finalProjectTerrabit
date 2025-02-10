import { NextRequest, NextResponse } from "next/server";
import { post } from "../../../const";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } } 
) {
  try {
    const token = req.cookies.get("token")?.value;
    const body = await req.json(); 
    const { id } = params; 

    const res = await post(`/api/reviews/${id}/create`, body, token);
    const data = await res.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Create review failed" },
      { status: 500 }
    );
  }
}
