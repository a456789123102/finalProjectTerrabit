import { NextRequest, NextResponse } from 'next/server';
import { post } from "../../const";

export async function POST(req: NextRequest) {
    try {
        // รับข้อมูลจาก form-data
        const formData = await req.formData();

        // ดึง token จาก cookies
        const token = req.cookies.get("token")?.value;

        // สร้าง formData เพื่อส่งไปยัง backend จริง
        const backendFormData = new FormData();
        formData.forEach((value, key) => {
            backendFormData.append(key, value);
        });
        const res = await post('/api/image/addImage', backendFormData, token);

        const data = await res.json();
        return NextResponse.json(data,{status:res.status});
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Error uploading image" }, { status: 500 });
    }
}
