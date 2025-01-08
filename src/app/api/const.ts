const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined in environment variables");
}

// ฟังก์ชันสำหรับสร้าง headers
const getHeaders = (token: string, isFormData: boolean = false): Record<string, string> => {
  return isFormData
    ? { cache: "no-store", ...(token ? { Authorization: token } : {}) }
    : { "Content-Type": "application/json", cache: "no-store", ...(token ? { Authorization: token } : {}) };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ฟังก์ชัน post สำหรับส่งข้อมูลไปยัง backend
export const post = async (
  url: string,
  body: any,
  token: string = ""
): Promise<Response> => {
  const isFormData = body instanceof FormData;

  console.log(`Sending data to: ${API_URL + url}`);
  console.log("Headers:", getHeaders(token, isFormData));

  if (isFormData) {
    console.log("FormData entries:", Array.from(body.entries()));
  } else {
    console.log("JSON Body:", JSON.stringify(body));
  }

  const response = await fetch(API_URL + url, {
    method: "POST",
    headers: getHeaders(token, isFormData),
    body: isFormData ? body : JSON.stringify(body),
  });

  // ตรวจสอบสถานะ response
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
  const headers = getHeaders(token);  
  const fullUrl = `${API_URL}${url}`;
  console.log("Full URL:", fullUrl); 

  const res = await fetch(fullUrl, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(body), 
  });

  return res;
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
return res;
}


