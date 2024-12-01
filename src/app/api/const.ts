const API_URL = process.env.NEXT_PUBLIC_API_URL; // ตรวจสอบว่า API_URL ถูกตั้งค่าใน .env.local อย่างถูกต้องหรือไม่

const getHeaders = (token: string) => {
  const headers: any = {
    "Content-Type": "application/json",
"cache":"no-store",
  };

  if (token) {
    headers.Authorization = token; // ตรวจสอบว่า token ที่แนบมากับ header ถูกต้องหรือไม่
  }

  return headers;
};

export const post = async (
  url: string,
  body: any,
  token: string = ""
): Promise<Response> => {
  const isFormData = body instanceof FormData; 
  const headers = getHeaders(token, isFormData); 

  const res = await fetch(API_URL + url, {
    method: "POST",
    headers: headers,
    body: isFormData ? body : JSON.stringify(body), 
  });

  return res;
};


export const get = async (url: string, token: string = "", params: any = {}): Promise<Response> => {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${process.env.NEXT_PUBLIC_API_URL}${url}?${queryString}` : `${process.env.NEXT_PUBLIC_API_URL}${url}`;

  // ใช้ URL ที่ถูกต้อง
  console.log("Requesting URL:", fullUrl); // ตรวจสอบ URL ที่กำลังจะส่ง

  const res = await fetch(fullUrl, {
    method: "GET",
    headers: getHeaders(token),
    next: { revalidate: 0 },
  });
  return res;
};

export const patch = async (
  url: string,
  body: any,
  token: string = ""
): Promise<Response> => {
  const headers = getHeaders(token);  // ใช้ getHeaders ในการสร้าง headers
  
  const fullUrl = `${API_URL}${url}`;
  console.log("Full URL:", fullUrl);  // ตรวจสอบ URL ที่จะส่งคำขอ

  const res = await fetch(fullUrl, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(body),  // แปลง body เป็น JSON ก่อนส่ง
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Error response from server:", errorData);
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  // อ่านข้อมูล response body
  const data = await res.json();
  console.log("Response data:", data);
  
  return data; // คืนค่า data โดยตรงแทน res
};

export const deleteRequest = async (
  url: string,
  body: any = null,
  token: string = ""
):  Promise<Response> => {
  const headers = getHeaders(token);
  const bodyContent = body? JSON.stringify(body): undefined;
  const fullUrl = `${API_URL}${url}`;
  console.log("Deleting URL:", fullUrl);  

  const res = await fetch(fullUrl,{
    method: "DELETE",
    headers: headers,
    body: bodyContent,
  });
  if(!res.ok){
    const errorData = await res.json();
    console.error("Error response from server:", errorData);
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }
  const data = res.json();
  return data;

}