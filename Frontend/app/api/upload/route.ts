// app/api/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // รับข้อมูลจาก formData
    const formData = await req.formData();
    const file = formData.get('file') as File | null; // ตรวจสอบว่าเป็นไฟล์หรือไม่

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // ตรวจสอบประเภทไฟล์เป็นรูปภาพ
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only image files are allowed!' }, { status: 400 });
    }

    // กำหนดที่เก็บไฟล์
    const uploadDir = './public/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // สร้างโฟลเดอร์หากไม่มี
    }

    // สร้าง path สำหรับไฟล์ที่ต้องการเก็บ
    const savedFileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, savedFileName);
    console.log(filePath)
    // ทำการบันทึกไฟล์ (จำเป็นต้องใช้ fs หรือฟังก์ชันที่รองรับการเขียนไฟล์)
    const buffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    return NextResponse.json({
      message: 'File uploaded successfully',
      file: savedFileName,
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
