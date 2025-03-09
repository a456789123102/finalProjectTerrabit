import {NextRequest, NextResponse } from 'next/server';
import {get} from '../../const'

export async function GET(req:NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;
        const res = await get('/api/address/province', token);
        const data = await res.json();
        return NextResponse.json(data,{status:res.status});
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "get province failed" }, { status: 500 });
    }
}
export const dynamic = 'force-dynamic';