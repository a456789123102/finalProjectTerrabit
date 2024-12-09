import React from 'react';
import AdminSidebar from './components/adminSidebar';

function AdminPage() {
    return (
        <div className="h-screen"> {/* เพิ่ม h-screen ให้กับ root div เพื่อให้ครอบคลุมความสูงทั้งหมด */}
            <div className='bg-white h-12 flex flex-row items-center border mb-[2px] mx-[2px] fixed w-full'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mx-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                </div>
                <div className='flex flex-row relative'>
                    <input className='h-8 pr-7 pl-2 border border-gray-500 w-64' />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 absolute right-1 top-1/2 transform -translate-y-1/2 hover:border cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
            </div>
            {/* เนื้อหาจะอยู่ที่นี่ */}
            <div className='flex flex-row h-full mx-[2px] fixed mt-12'>
                <AdminSidebar />
            </div>
        </div>
    );
}

export default AdminPage;
