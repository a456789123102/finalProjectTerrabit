import { NextRequest, NextResponse } from 'next/server';
import { get } from "../../const";

export async function GET(req:NextRequest){
try {
    const token = req.cookies.get("token")?.value;
    
} catch (error) {
    
}
}