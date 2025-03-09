import { type NextRequest, NextResponse } from "next/server";
import { get } from '../../const';

export async function GET(req: NextRequest) {
    // ดึง token จาก cookie
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized, token is missing" }, { status: 401 });
    }

    const res = await get("/api/user/me", token);
    const data = await res.json();

    return NextResponse.json(data, {
        status: res.status,
    });
}
