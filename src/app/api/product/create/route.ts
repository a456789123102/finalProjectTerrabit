
import { NextRequest, NextResponse } from 'next/server';
import formidable, { Fields, Files } from 'formidable';
import { post } from '../../const';

// Helper: Parse FormData

export async function POST(req: NextRequest){
  try {
    const token = req.cookies.get("token")?.value;
    console.log(`token: ${token}`);
    const body = await req.json();
    const res = await post('/api/product/create',body,token)
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Error while creating product" }, { status: 500 });
  }
}