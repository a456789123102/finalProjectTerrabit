'use client'; // ใช้คำสั่งนี้ที่บรรทัดแรก

import React, { useEffect, useState } from 'react';
import { getOwnAddress, deleteAddress } from '@/app/apis/address'; 
import { useRouter } from 'next/navigation';
import { MapPinPlus } from "lucide-react"

interface Address {
    id: number;
    recipientName: string;
    currentAddress: string;
    provinceName: string;
    amphureName: string;
    tambonName: string;
    zipCode: string;
    mobileNumber: string;
    email?: string;
}

function MyAddress() {
    const router = useRouter();
    const [address, setAddress] = useState<Address[]>([]);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await getOwnAddress();
                console.log('Fetched address:', response);
                
                if (response?.addresses) {
                    setAddress(response.addresses);
                    console.log('Updated address (inside fetch):', response.addresses);
                } else {
                    console.warn(" API response ไม่มี addresses:", response);
                }
            } catch (error) {
                console.error('Error fetching address:', error);
            }
        };
        fetchAddress();
    }, []);
    
    
    

    useEffect(() => {
        console.log('Updated address:', address);
    }, [address]);
    

    const addressAmount = address ? address.length : 0;
    const handleEditClick = (id: number) => {
        router.push(`/address/${id}/edit`);
    }

    const handleDeleteClick = async (id: number) => {
        try {
            const deleteAction = await deleteAddress(id);
            console.log('Deleted address:', deleteAction);
            if (deleteAction) {
                setAlertMessage('Address deleted successfully!');
                setTimeout(() => {
                    setAlertMessage(null);
                }, 2000);
            }
            setAddress(address.filter((addr) => addr.id !== id));
        } catch (error) {
            console.error('Error deleting address:', error);
            setAlertMessage('Failed to delete Address!');
            setTimeout(() => {
                setAlertMessage(null);
            }, 2000);
        }
    }

    return (
        <div className='w-full h-screen flex justify-center items-center relative'>
            {alertMessage && (
                <div
                    className={` fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-7 rounded shadow-lg ${alertMessage.includes("successfully")
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {alertMessage}
                </div>
            )}
            <div className='w-3/5 min-w-96 bg-slate-100 flex flex-col p-7 mt-20 min-h-screen '>
                <div className='flex flex-row justify-between font-bold py-3'>
                    <div className='text-xl '>You have {addressAmount} Addresses</div>
                    <div className='p-3 bg-slate-600 text-white cursor-pointer rounded-[4px] hover:bg-slate-800 flex flex-row gap-2' onClick={() => router.push('/address/create')}>
                        <MapPinPlus />
                        <div className=''>Add new Address</div>
                    </div>
                </div>
                {addressAmount > 0 ?
                    <div>
                        {address.map((addr) => (
                            <div key={addr.id} className='border-2 p-4 mb-4 bg-white hover:bg-zinc-50 flex flex-row'>
                                <div className="w-full flex flex-col gap-1">
                                    {/* Recipient Name */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                        <div className="sm:w-1/4 text-right font-bold">Recipient Name:</div>
                                        <div className="sm:w-3/4 sm:pl-2">{addr.recipientName}</div>
                                    </div>

                                    {/* Current Address */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                        <div className="sm:w-1/4 text-right font-bold">Current Address:</div>
                                        <div className="sm:w-3/4 sm:pl-2">{addr.currentAddress}</div>
                                    </div>

                                    {/* Tambon (Subdistrict) */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                        <div className="sm:w-1/4 text-right font-bold">Subdistrict (Tambon):</div>
                                        <div className="sm:w-3/4 sm:pl-2">{addr.tambonName}</div>
                                    </div>

                                    {/* Amphure (District) */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                        <div className="sm:w-1/4 text-right font-bold">District (Amphure):</div>
                                        <div className="sm:w-3/4 sm:pl-2">{addr.amphureName}</div>
                                    </div>

                                    {/* Province */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                        <div className="sm:w-1/4 text-right font-bold">Province:</div>
                                        <div className="sm:w-3/4 sm:pl-2">{addr.provinceName}</div>
                                    </div>

                                    {/* Zip Code */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                        <div className="sm:w-1/4 text-right font-bold">Zip Code:</div>
                                        <div className="sm:w-3/4 sm:pl-2">{addr.zipCode}</div>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                        <div className="sm:w-1/4 text-right font-bold">Phone Number:</div>
                                        <div className="sm:w-3/4 sm:pl-2">{addr.mobileNumber}</div>
                                    </div>

                                    {/* E-mail (if exists) */}
                                    {addr.email && (
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                            <div className="sm:w-1/4 text-right font-bold">E-mail:</div>
                                            <div className="sm:w-3/4 sm:pl-2">{addr.email}</div>
                                        </div>
                                    )}
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
                                            className="size-7 cursor-pointer hover:text-yellow-700"
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
                                    <div className="relative group flex items-center justify-center" onClick={() => handleDeleteClick(addr.id)}>
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
                    <div>Create some...</div>
                }
            </div>
        </div>
    )
}

export default MyAddress
