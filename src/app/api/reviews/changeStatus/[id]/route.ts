import { NextRequest,NextResponse } from "next/server";
import{patch} from "@/app/api/const";

export async function PATCH(req: NextRequest,{params}:{params:{id:string}}) {
    try {
        const {id} = params;
        const token = req.cookies.get("token")?.value;
        const res = await patch(`/api/reviews/changeStatus/${id}`,{},token);
        const data = await res.json();
        return NextResponse.json(data,{status:res.status});
    } catch (error) {
        return NextResponse.json({error:"change review status failed"},{status:500})
    }
}