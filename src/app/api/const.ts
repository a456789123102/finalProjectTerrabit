const API_URL = process.env.NEXT_PUBLIC_API_URL; // ตรวจสอบว่า API_URL ถูกตั้งค่าใน .env.local อย่างถูกต้องหรือไม่

const getHeaders = (token: string) => {
  const headers: any = {
    "Content-Type": "application/json",
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
  const isFormData = body instanceof FormData; // เช็คว่า body เป็น FormData หรือไม่
  const headers = getHeaders(token, isFormData); // เรียกใช้ getHeaders

  const res = await fetch(API_URL + url, {
    method: "POST",
    headers: headers,
    body: isFormData ? body : JSON.stringify(body), // ถ้าเป็น FormData ไม่ต้องแปลงเป็น JSON
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
  });
  return res;
};
