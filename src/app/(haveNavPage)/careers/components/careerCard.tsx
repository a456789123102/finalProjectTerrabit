'use client'
import React from 'react';

type career = {
  id: number;
  location: string;
  salary: number;
  site: string;
  title: string;
  type: string;
}

const CareerCards = ({ career, onClick, isSelected }: { career: career, onClick: () => void, isSelected: boolean }) => { 
  return (
    <div 
      className={`border rounded-lg p-4 shadow-lg hover:bg-gray-100 flex flex-col justify-between gap-3 bg-white mb-2 cursor-pointer ${isSelected ? 'bg-[#ECDFCC]' : ''}`}  // ใช้ class 'bg-yellow-200' เมื่อถูกเลือก
      onClick={onClick}  // เพิ่ม onClick ที่นี่
    >
      <div>
        <div className="text-lg font-semibold mb-2">{career.title}</div>
        <div className=''>
          <div className='p-1'>Location: {career.location}</div>
          <div className='p-1'>Site: {career.site}</div>
          <div className='p-1'>Type: {career.type}</div>
        </div>
      </div>
    </div>
  );
};

export default CareerCards;
