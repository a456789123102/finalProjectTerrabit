export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs/promises';
import FormData from 'form-data';
import { post } from '../../const';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper: แปลง Buffer เป็น Stream
const bufferToStream = (buffer: Buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

// Helper: Parse FormData
const parseForm = async (req: NextRequest) => {
  const buffer = await req.arrayBuffer();
  const stream = bufferToStream(Buffer.from(buffer));

  (stream as any).headers = {
    ...Object.fromEntries(req.headers),
    'content-length': buffer.byteLength.toString(),
  };

  return new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
    const form = formidable({ multiples: true });
    form.parse(stream as any, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const { fields, files } = await parseForm(req);

    console.log("Fields received:", fields);
    console.log("Files received:", files);

    const formData = new FormData();

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, Array.isArray(value) ? value[0] : value); // ใช้ค่าแรกใน array
    });

    for (const [key, fileValue] of Object.entries(files)) {
      const file = fileValue as formidable.File;
      if (file && file.filepath) {
        const fileBuffer = await fs.readFile(file.filepath);
        formData.append(key, fileBuffer, file.originalFilename || "file");
      }
    }

    console.log("FormData entries being sent:");
    Array.from(formData.entries()).forEach(([key, value]) =>
      console.log(`${key}:`, value instanceof Buffer ? "[Binary File]" : value)
    );

    const apiResponse = await post("/api/product/create", formData, token);

    if (!apiResponse.ok) {
      const error = await apiResponse.text();
      console.error("Error response from backend:", error);
      return NextResponse.json({ error }, { status: apiResponse.status });
    }

    const apiData = await apiResponse.json();
    return NextResponse.json({ message: "Success", data: apiData });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
