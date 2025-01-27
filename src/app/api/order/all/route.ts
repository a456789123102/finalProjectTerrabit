import { NextRequest, NextResponse } from "next/server";
import { get } from "../../const";

// export async function GET(req: NextRequest) {
//   try {
//     const token = req.cookies.get("token")?.value;
//     const searchParams = req.nextUrl.searchParams;

//     const statuses = searchParams.getAll("status")|| undefined;
//        const page = searchParams.get('page') || undefined;
//         const pageSize = searchParams.get('pageSize') || undefined;
//             const search = searchParams.get('search') || undefined;

//     const backendParams = new URLSearchParams();
// if(statuses){
//   statuses.forEach((status) => {
//     backendParams.append("status", status);
//   });
// }
//     if (search) {
//       backendParams.search = search;
//     }
//     if(page){
//       backendParams.page = parseInt(page);
//     }
//     if(pageSize){
//       backendParams.pageSize = parseInt(pageSize);
//     }

//     const res = await get(`/api/order/all`, token,backendParams.toString());
//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error fetching orders from backend", error);
//     return NextResponse.error();
//   }
// }

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    // ส่ง searchParams ตรง ๆ โดยไม่ต้องประกอบใหม่
    const res = await get(`/api/order/all?${req.nextUrl.searchParams.toString()}`, token);

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching orders from backend", error);
    return NextResponse.error();
  }
}
