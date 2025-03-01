import { NextRequest,NextResponse } from "next/server";
import {get} from "@/app/api/const"

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;
        const res = await get(`/api/user/charts/getTotalUsersForCharts?${req.nextUrl.searchParams.toString()}`, token);
        const data = await res.json();
        return NextResponse.json(data, {
            status: res.status,
        });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Failed to get careers" }, { status: 500 });
    }
}