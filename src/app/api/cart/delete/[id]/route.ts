import { NextRequest, NextResponse } from "next/server";
import { deleteRequest } from "@/app/api/const";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const {id} = params;
        const token = req.cookies.get("token")?.value; 
        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 401 });
        }
        console.log("Token:", token);
        console.log("Product ID:", id);
        const response = await deleteRequest(`/api/cart/delete/${id}`, token);

        if (response) {
            return NextResponse.json({ message: "Item deleted successfully" });
        } else {
            return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
        }
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Delete cartProduct failed" }, { status: 500 });
    }
}
