import {NextRequest, NextResponse } from 'next/server';
import {post} from '../../const'

export async function POST(req:NextRequest) {
    try {
        const body = await req.json();
        const token = req.cookies.get("token")?.value;
        const res = await post('/api/address/create', body, token);
        const data = await res.json();
        return NextResponse.json(data,{status:res.status});
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "create address failed" }, { status: 500 });
    }
}