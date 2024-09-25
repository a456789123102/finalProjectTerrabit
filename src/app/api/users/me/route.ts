import { type NextRequest, NextResponse } from "next/server";
import { get } from'../../const';

export async function GET(req: NextRequest) {
    const res = await get("/api/user/me", req.cookies.get("token")?.value);
    const data =await res.json();

    return NextResponse.json(data, {
        status: res.status,
    });
}