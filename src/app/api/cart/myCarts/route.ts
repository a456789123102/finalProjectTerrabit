import { type NextRequest, NextResponse } from 'next/server';
import {get} from "../../const";
export const config = {
    runtime: "edge", 
  };
  export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;
       const res = await get("/api/cart/myCart",token);
       const data = await res.json(); 
       return NextResponse.json(data,{status:res.status});
    } catch (error) {
console.log("Server error:", error);
    }
}