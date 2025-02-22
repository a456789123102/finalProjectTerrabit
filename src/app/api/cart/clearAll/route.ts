import {NextRequest, NextResponse } from 'next/server';
import { deleteRequest } from "@/app/api/const";

export async function DELETE(req: NextRequest) {
try {
    const token = req.cookies.get("token")?.value; 
    if (!token) {
        return NextResponse.json({ error: "Token not found" }, { status: 401 });
    }
    const res = await deleteRequest(`/api/cart/clearAll`, token);
const data = await res.json();
return NextResponse.json(data,{status:res.status});
} catch (error) {
    return NextResponse.json({message: "ClearAll failed",error }, { status: 500 });
}
}
