export const getTokenFromCookies = (): string | null => {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    if (tokenCookie) {
      return tokenCookie.split('=')[1]; // แยกเอาเฉพาะค่าของ token
    }
    return null; // คืนค่า null ถ้าไม่พบ token ใน cookies
  };
  