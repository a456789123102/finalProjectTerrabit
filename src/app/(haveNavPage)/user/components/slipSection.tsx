'use client';

import React, { useState } from 'react';
import Image from "next/image";

function SlipSection({ order, isModalOpen, handleImageClick, handleModalClose, handleUploadSlip }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateFile = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return 'Unsupported file type. Please upload a JPEG or PNG image.';
    }
    if (file.size > maxSize) {
      return 'File size exceeds 5MB limit. Please upload a smaller file.';
    }
    return null; // File is valid
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const error = validateFile(file);
      if (error) {
        setErrorMessage(error);
      } else {
        setErrorMessage(null);
        setSelectedFile(file);
      }
    }
  }

  return (
    <div className="w-full flex flex-col gap-2">
      {/* ข้อความแสดงสถานะ */}
      {order.slipUrl ? (
        <div className="text-green-700">Your Payment Slip:</div>
      ) : (
        <div className="text-red-700">Please upload your payment slip Here:</div>
      )}

      {/* อัพโหลดสลิป */}
      {order.status === "awaiting_slip_upload" && (
        <div className="flex flex-col gap-2">
          <input
            type="file"
            placeholder="Slip Image"
             accept="image/jpeg, image/png"
             onChange={handleFileChange}
          />
            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          {/* ปุ่ม Upload จะแสดงเมื่อมีรูปภาพ */}
          {selectedFile && (
             <div className="flex flex-col items-start gap-2">
          <div>Selected File: {selectedFile.name}</div>
            <button
              className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => handleUploadSlip(order.id, selectedFile)} // ส่งไฟล์ไปยังฟังก์ชันอัพโหลด
            >
              Upload
            </button>
            </div>
          )}
        </div>
      )}

      {/* แสดงรูปภาพถ้ามี slipUrl */}
      {order.slipUrl && (
        <div>
          <Image
            src={order.slipUrl}
            alt="Slip"
            width={100}
            height={100}
            className="cursor-pointer"
            onClick={handleImageClick} // คลิกเพื่อเปิด Modal
          />
        </div>
      )}

      {/* Modal สำหรับรูปภาพขยาย */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleModalClose} // คลิกนอก Modal เพื่อปิด
        >
          <div className="relative">
            {/* รูปภาพขยาย */}
            <Image
              src={order.slipUrl}
              alt="Slip Enlarged"
              width={800}
              height={800}
            />
            {/* ปุ่มปิด */}
            <button
              className="absolute top-2 right-2 text-white bg-red-600 px-2 py-1 rounded"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SlipSection;
