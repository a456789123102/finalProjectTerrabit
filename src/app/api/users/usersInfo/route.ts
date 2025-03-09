import { NextRequest, NextResponse } from "next/server";
import { get } from "../../const";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const res = await get(
      `/api/user/usersInfo?${req.nextUrl.searchParams.toString()}`,
      token
    );
    const data = await res.json();
    return NextResponse.json(data,{status:res.status});
  } catch (error) {
    console.error("Error fetching users from backend", error);
    return NextResponse.error();
  }
}
export const dynamic = 'force-dynamic';