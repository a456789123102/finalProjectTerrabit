import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const API_URL = "https://thaiaddressapi-thaikub.herokuapp.com";

  try {
    const fullUrl = `${API_URL}/v1/thailand/provinces`;
    const res = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "cache": "no-store",
      },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.error();
  }
}
