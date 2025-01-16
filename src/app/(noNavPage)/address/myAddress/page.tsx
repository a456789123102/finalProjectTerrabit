'use client'; // ใช้คำสั่งนี้ที่บรรทัดแรก

import React, { useEffect, useState } from 'react';
import { getOwnAddress } from '@/app/apis/address'; // Make sure to replace 'path-to-getOwnAddress' with the actual path
import { useRouter } from 'next/navigation'; 

interface Address {
    id: number;
    recipientName: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

function MyAddress() {
    const router = useRouter();
    const [address, setAddress] = useState<Address[]>([]);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await getOwnAddress();
                console.log('Fetched address:', response);
                setAddress(response.address);
            } catch (error) {
                console.error('Error fetching address:', error);
            }
        };
        fetchAddress();
    }, []);
    const addressAmount = address.length;
    const handleEditClick = (id: number) => {
       router.push(`/address/${id}/edit`);
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='w-3/5 min-w-96 bg-slate-100 min-h-96 flex flex-col p-7'>
                <div className='text-xl py-3'>You have {addressAmount} Addresses</div>
                {addressAmount > 0 ?
                    <div>
                        {address.map((addr) => (
                            <div key={addr.id} className='border-2 p-4 mb-4 hover:bg-zinc-200 flex flex-row'>
                                <div className='w-full flex flex-col'>
                                    <div><strong>Recipient Name :</strong> {addr.recipientName}</div>
                                    <div><strong>City :</strong> {addr.city}</div>
                                    <div><strong>State :</strong> {addr.state}</div>
                                    <div><strong>Zip Code :</strong> {addr.zipCode}</div>
                                </div>
                                <div className="flex flex-col items-center justify-between space-y-2">

                                    {/* Edit Icon */}
                                    <div className="relative group flex items-center justify-center" onClick={() => handleEditClick(addr.id)} >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-7 cursor-pointer"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                            />
                                        </svg>

                                        {/* Tooltip */}
                                        <span className="absolute left-1/2 -top-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-slate-700 text-white text-xs px-2 py-1 rounded-md">
                                            Edit
                                        </span>
                                    </div>

                                    {/* Delete Icon */}
                                    <div className="relative group flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-7 cursor-pointer text-red-500 hover:text-red-700"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                        <span className="absolute left-1/2 -top-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-slate-700 text-white text-xs px-2 py-1 rounded-md">
                                            Delete
                                        </span>
                                    </div>
                                </div>


                            </div>
                        ))}
                    </div>
                    :
                    <div>go create one</div>
                }
            </div>
        </div>
    )
}

export default MyAddress
