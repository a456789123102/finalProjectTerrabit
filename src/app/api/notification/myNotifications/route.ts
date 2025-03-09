import { NextRequest, NextResponse } from "next/server";
import {get } from "@/app/api/const";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 401 });
        }
        const res = await get(`/api/notification/myNotifications`, token);
        const data = await res.json();
        return NextResponse.json(data,{status:res.status});
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error:" fetch notification failed" }, { status: 500 });
    }
}
export const dynamic = 'force-dynamic';