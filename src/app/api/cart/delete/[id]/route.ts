import { NextRequest, NextResponse } from "next/server";
import { deleteRequest } from "@/app/api/const";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const {id} = params;
        const token = req.cookies.get("token")?.value; 
        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 401 });
        }

        const res = await deleteRequest(`/api/cart/delete/${id}`, token);
const data = await res.json();

        return NextResponse.json(data);

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Delete cartProduct failed" }, { status: 500 });
    }
}
