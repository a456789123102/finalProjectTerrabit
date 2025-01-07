const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined in environment variables");
}

const getHeaders = (token: string, isFormData: boolean = false) => {
  return isFormData
    ? { cache: "no-store", ...(token ? { Authorization: token } : {}) }
    : { "Content-Type": "application/json", cache: "no-store", ...(token ? { Authorization: token } : {}) };
};
///////////////////////////////////////////////////////////////////////////////////////////////////
export const post = async (
  url: string,
  body: any,
  token: string = ""
): Promise<Response> => {
  const isFormData = body instanceof FormData;

  // กำหนด headers ตามประเภทของ body
  const getHeaders = (token: string, isFormData: boolean = false): Record<string, string> => {
    const headers: Record<string, string> = {
      ...(token && { Authorization: `${token}` }), // เพิ่ม Authorization เฉพาะเมื่อมี token
      ...(isFormData ? {} : { "Content-Type": "application/json" }), // ไม่กำหนด Content-Type สำหรับ FormData
      cache: "no-store", // ใช้ cache แบบ no-store เสมอ
    };
    return headers;
  };
  console.log(`Sending data to: ${API_URL + url}`);

  if (isFormData) {
    console.log("FormData entries:", Array.from(body.entries()));
  } else {
    console.log("JSON Body:", JSON.stringify(body)); 
  }

  const response = await fetch(API_URL + url, {
    method: "POST",
    headers: getHeaders(token, isFormData), // เพิ่ม isFormData ให้ getHeaders
    body: isFormData ? body : JSON.stringify(body), // ส่ง FormData หรือ JSON string
  });
  

  if (!response.ok) {
    const error = await response.text();
    console.error(`Error from backend (status ${response.status}):`, error);
    throw new Error(`Backend Error: ${error}`);
  }

  return response;
};




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const get = async (url: string, token: string = "", params: any = {}): Promise<Response> => {
  console.log("Params before creating queryString:", params); // เพิ่ม log เพื่อตรวจสอบ params

  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${process.env.NEXT_PUBLIC_API_URL}${url}?${queryString}` : `${process.env.NEXT_PUBLIC_API_URL}${url}`;

  console.log("Requesting Full URL:", fullUrl); // ตรวจสอบ URL ที่สร้างขึ้น

  const res = await fetch(fullUrl, {
    method: "GET",
    headers: getHeaders(token),
    next: { revalidate: 0 },
  });
  return res;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteRequest = async (
  url: string,
  token: string = ""
): Promise<any> => {
  const headers = getHeaders(token);
  const fullUrl = `${API_URL}${url}`;
  console.log("Deleting URL:", fullUrl);

  const res = await fetch(fullUrl, {
    method: "DELETE",
    headers: headers
  });

  if (!res.ok) {
    const text = await res.text();  // อ่านข้อมูลเป็น text ก่อน
    console.error("Error response from server:", text);
    throw new Error(`Error: ${res.status} ${res.statusText} - Response: ${text}`);
  }

  let data;
  try {
    data = await res.json();  // แปลง response เป็น JSON
  } catch (error) {
    console.error("Failed to parse JSON response:", error);
    throw new Error('Response is not valid JSON');
  }

  console.log("Response data:", data);
  return data;
}


