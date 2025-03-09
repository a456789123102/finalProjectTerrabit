import { NextRequest, NextResponse } from 'next/server';
import {get} from '../const';

export async function GET(req: NextRequest) {
  try {
      const token = req.cookies.get("token")?.value;
      if (!token) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const res = await get('/api/category', token);
      if (!res.ok) {
          return NextResponse.json({ error: "Failed to fetch categories" }, { status: res.status });
      }

      const data = await res.json();
      return NextResponse.json(data, { status: 200 });

  } catch (error) {
      console.error("Server error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
