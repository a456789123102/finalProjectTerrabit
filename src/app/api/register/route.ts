import { type NextRequest, NextResponse } from 'next/server';
import { post } from "../const"; 

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const res = await post('/api/auth/register', body);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "เกิดข้อผิดพลาดในการลงทะเบียน" }, { status: 500 });
    }
}