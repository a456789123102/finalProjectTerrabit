import { NextRequest,NextResponse } from "next/server";
import {post} from "@/app/api/const";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const token = req.cookies.get("token")?.value;
        const res = await post('/api/ticket/create', body, token);
        const data = await res.json();
        return NextResponse.json(data,{status:res.status});
    } catch (error) {
        console.error("Server error:", error);
    }

}