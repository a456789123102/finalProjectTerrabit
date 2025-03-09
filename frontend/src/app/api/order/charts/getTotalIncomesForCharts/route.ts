import { NextRequest,NextResponse } from "next/server";
import {get} from "@/app/api/const"

export async function GET(req: NextRequest) {
try {
    const token = req.cookies.get('token')?.value;
    const res = await get(`/api/order/charts/getTotalIncomesForCharts?${req.nextUrl.searchParams.toString()}`, token);
    const data = await res.json();
    return NextResponse.json(data,{status:res.status});
} catch (error) {
    return NextResponse.error();
}
}