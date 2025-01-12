import { type NextRequest, NextResponse } from 'next/server';
import { patch } from "../../const"; 



  export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const token = req.cookies.get("token")?.value;

        const res = await patch('/api/address/update', body, token);
        const data = await res.json();
        return NextResponse.json(data);
    }catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "update product failed" }, { status: 500 });
    }
}