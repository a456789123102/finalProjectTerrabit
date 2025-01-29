import { NextRequest, NextResponse } from "next/server";
import { post } from "@/app/api/const";

export async function POST(req: NextRequest) {
    try {
        console.log("Checkout NextJS here naja")
        const token = req.cookies.get("token")?.value;
        console.log("Token from NextJS:", token);
        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 401 });
        }
        const res = await post("/api/cart/checkout",{},  token);
        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
    }
}