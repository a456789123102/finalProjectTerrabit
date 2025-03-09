/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
  images: {
    domains: ['firebasestorage.googleapis.com', 'lovedrinks.com'], // เพิ่มโดเมนของรูปภาพที่ต้องการใช้
  },
};

export default nextConfig;
