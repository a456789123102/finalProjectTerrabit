import { NextRequest,NextResponse } from "next/server";
import {get} from "@/app/api/const"

export async function GET(req: NextRequest,{params}: {params:{id:string}}) {
    try {
        const {id} = params;
        const token = req.cookies.get("token")?.value;
        const res = await get(`/api/address/${id}/amphure`, token);
        const data = await res.json();
        return NextResponse.json(data, {
            status: res.status,
        });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "fetch amphure failed" }, { status: 500 });
    }
}