import { NextRequest,NextResponse } from "next/server";
import {get} from "@/app/api/const";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;
         if (!token) {
             return NextResponse.json({error: "Token not found"}, {
                 status: 401,
             });
         }
        const res = await get(`/api/ticket/justCountTickets`, token);
        const data = await res.json();
        return NextResponse.json(data, {
            status: res.status,
        });
    } catch (error) {
        return NextResponse.json({error: "Failed to retrieve justCountTickets"}, {
            status: 500,
        });
    }
 
}