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
  const res = await fetch(API_URL + url, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });
  return res;
};

export const get = async (
  url: string,
  token: string = "",
  params: any = {}
): Promise<Response> => {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}?${queryString}`, {
    method: "GET",
    headers: getHeaders(token),
  });
  return res;
};