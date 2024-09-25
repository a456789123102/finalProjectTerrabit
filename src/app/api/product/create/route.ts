import { type NextRequest, NextResponse } from 'next/server';
import { post } from "../../const"; 

export const config = {
  runtime: "edge", 
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const token = req.cookies.get("token")?.value;

        const res = await post('/api/product/create', body, token);
        const data = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "create product failed" }, { status: 500 });
    }
}
