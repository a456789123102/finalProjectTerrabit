const API_URL = process.env.NEXT_PUBLIC_API_URL 

const getHeaders = (token: string) => {
  const headers: any = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
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
  const res = await fetch(API_URL + url + "?" + queryString, {
    method: "GET",
    headers: getHeaders(token),
  });
  return res;
};
