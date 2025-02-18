import { NextRequest,NextResponse } from "next/server";
import{patch} from "@/app/api/const"

export async function PATCH(req: NextRequest,{params}: {params:{id:string}}) {
    try {
        const {id} = params;
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 401 });
        }
        const res = await patch(`/api/user/${id}/changeIsActiveStatus`,{}, token);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}