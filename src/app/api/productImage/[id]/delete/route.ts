import { NextRequest, NextResponse } from 'next/server';
import { deleteRequest } from '@/app/api/const';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } } ) {
    try {
        const token = req.cookies.get('token')?.value;
        const imageId = params.id;
         const res = await deleteRequest(`/api/productImage/${imageId}/delete`, token);
const data = await res.json();
return NextResponse.json(data);
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Error deleting image" }, { status: 500 });
    }
}