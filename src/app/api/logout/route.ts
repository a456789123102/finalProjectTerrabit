import { type NextRequest, NextResponse } from "next/server";
import {post} from "../const";

export async function POST(req: NextRequest) {

    const response = new NextResponse(null, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    response.cookies.delete("token");

    return response;
}
