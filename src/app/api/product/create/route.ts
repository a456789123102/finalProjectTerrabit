import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import formidable, { Fields, Files } from "formidable";
import fs from "fs/promises";
import FormData from "form-data"; // ใช้ form-data library
import { post } from "../../const"; // ฟังก์ชันสำหรับส่งต่อข้อมูลไปยัง backend อื่น

export const config = {
  api: {
    bodyParser: false, // ปิด bodyParser เพื่อรองรับ FormData
  },
};

// Helper function: Convert Buffer to Readable stream
const bufferToStream = (buffer: Buffer): Readable => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

export async function POST(req: NextRequest) {
  try {
    // อ่านข้อมูลจาก ReadableStream ของ Next.js
    const bodyBuffer = await req.arrayBuffer();
    const bodyStream = bufferToStream(Buffer.from(bodyBuffer));

    // สร้าง formidable instance
    const form = formidable({ multiples: true });

    // แยกข้อมูล Fields และ Files
    const { fields, files }: { fields: Fields; files: Files } = await new Promise((resolve, reject) => {
      form.parse(bodyStream, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    console.log("Fields received:", fields); // Debug fields
    console.log("Files received:", files);   // Debug files

    // เตรียมข้อมูลสำหรับส่งต่อไปยัง backend อื่น
    const formData = new FormData();

    // เพิ่ม Fields ลงใน FormData
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    // เพิ่ม Files ลงใน FormData
    for (const [key, fileValue] of Object.entries(files)) {
      const file = fileValue as formidable.File;
      if (file && file.filepath) {
        // อ่านไฟล์จากระบบด้วย fs
        const fileBuffer = await fs.readFile(file.filepath);
        formData.append(key, fileBuffer, file.originalFilename || "file");
      }
    }

    // ส่งข้อมูลไปยัง backend อื่น
    const apiResponse = await post("/api/another-endpoint", formData);

    // ตรวจสอบและแปลง response เป็น JSON
    const apiData = await apiResponse.json();
    console.log("Response from another backend:", apiData);

    return NextResponse.json({
      message: "FormData received and forwarded successfully",
      apiData,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
