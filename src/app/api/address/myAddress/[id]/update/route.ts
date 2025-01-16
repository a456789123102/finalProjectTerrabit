import { type NextRequest, NextResponse } from 'next/server';
import { patch } from "@/app/api/const"; 



  export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await req.json();
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 401 });
        }

        const res = await patch(`/api/address/myAddress/${id}/update`, body, token);
        const data = await res.json();
        return NextResponse.json(data);
    }catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "update product failed" }, { status: 500 });
    }
}