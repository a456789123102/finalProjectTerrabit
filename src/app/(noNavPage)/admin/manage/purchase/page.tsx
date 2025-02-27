'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '@/app/context/themeContext';
import PaginationControls from '../../components/PaginationControls';
import useFetchOrders from '../../hooks/orders/useFetchOrders';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import DataTable from '../../components/dataTable';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { updateOrderStatus } from '@/app/apis/order';
import SearchAndFilterBar from '../../components/SearchAndFilterBar';
import OrderStatusSelectDropdown from './components/orderStatusSelectDropdown';

// Define the types for your orders
type Order = {
    id: number;
    items: { productName: string }[];
    totalPrice: number;
    slipUrl?: string | null;
    createdAt: string;
    status: string;
};

type PaginationState = {
    page: number;
    pageSize: number;
    totalPages: number;
    totalOrders: number;
};

type SelectedOrders = Record<number, boolean>;

function PurchaseTable() {
    const { themeColors } = useTheme();
    const [status, setStatus] = useState<string[]>([]);
    const [selectedOrders, setSelectedOrders] = useState<SelectedOrders>({});
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [tempSearchQuery, setTempSearchQuery] = useState<string>('');
      const [orderBy, setOrderBy] = useState("");
      const [orderWith, setOrderWith] = useState("");
    const [actionType, setActionType] = useState<string>("");
    const [pagination, setPagination] = useState<PaginationState>({
        page: 1,
        pageSize: 10,
        totalPages: 1,
        totalOrders: 0,
    });
    const [forceFetch, setForceFetch] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const orders: Order[] = useFetchOrders(status, forceFetch, searchQuery, pagination, setPagination) ?? [];

    console.log("orders:", orders);
    console.log("pagi:", pagination ?? { page: "undefined", pageSize: "undefined" });


    const [columnKeysFiltered, setColumnKeysFiltered] = useState<string[]>([
        'id',
        'items',
        'totalPrice',
        'slipUrl',
        'createdAt',
        'status',
        'Select',
    ]);

    const columnKeys = useMemo(() => {
        if (!orders.length) return [];
        return [...Object.keys(orders[0]), 'Select'];
    }, [orders]);

    const handleReject = async (orderId: number, currentStatus: string) => {
        try {
            const validStatus = ['pending_payment_verification', 'pending_refound'];
            if (!validStatus.includes(currentStatus)) {
                console.error(`Invalid status: ${currentStatus}.`);
                throw new Error(`Invalid status: ${currentStatus}`);
            }

            const updatedStatus = "cancelled_by_admin";
            console.log(`Order ${orderId} rejected from status ${currentStatus} with new status: ${updatedStatus}`);

            const res = await updateOrderStatus(orderId, updatedStatus);

            // ตรวจสอบผลลัพธ์จาก API ใหม่
            if (!res || res.status !== 200) {
                throw new Error(`Failed to update status for Order ID ${orderId}`);
            }

            console.log(`Order ${orderId} status updated successfully to: ${updatedStatus}`);
        } catch (error) {
            console.error('Failed to reject status', error);
            throw error;
        }
    };
    const handleApprove = async (orderId: number, currentStatus: string) => {
        try {
            if (!["pending_payment_verification", "pending_refound"].includes(currentStatus)) {
                console.error(`Invalid status: ${currentStatus}`);
                return;
            }

            let updatedStatus = currentStatus === "pending_payment_verification" ? "payment_verified" : "refund_completed";

            console.log(`Updating Order ${orderId} -> ${updatedStatus}`);
            const res = await updateOrderStatus(orderId, updatedStatus);

            if (!res || res?.status !== 200) {
                console.error(`Failed to update Order ID ${orderId}`);
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: `Could not update Order ID ${orderId}. Please try again.`,
                });
                return;
            }

            console.log(`Order ${orderId} updated successfully.`);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: `Order ID ${orderId} updated successfully.`,
                timer: 2000,
                showConfirmButton: false,
            });

            // ✅ อัปเดตข้อมูลใหม่หลังเปลี่ยนสถานะสำเร็จ
            setForceFetch(prev => !prev);
        } catch (error) {
            console.error('Failed to update order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Unexpected Error',
                text: 'An unexpected error occurred. Please try again.',
            });
        }
    };


    const handleConfirm = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to ${actionType} the selected orders?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, proceed!',
            cancelButtonText: 'No, cancel!',
            background: themeColors.primary,
            color: themeColors.text,
        });

        if (!result.isConfirmed) {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Action Cancelled',
                text: 'No changes were made.',
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }

        try {
            const failedOrders: string[] = [];
            for (const [orderIdStr, isSelected] of Object.entries(selectedOrders)) {
                if (isSelected) {
                    const orderId = parseInt(orderIdStr, 10);
                    const order = orders.find((o) => o.id === orderId);

                    if (!order) {
                        console.warn(`Order ID ${orderId} not found.`);
                        failedOrders.push(orderIdStr);
                        continue;
                    }

                    try {
                        if (actionType === 'approve') {
                            await handleApprove(orderId, order.status); // รอให้ handleApprove เสร็จ
                        } else if (actionType === 'reject') {
                            await handleReject(orderId, order.status); // รอให้ handleReject เสร็จ
                        }
                    } catch (error) {
                        console.error(`Failed to update Order ID ${orderId}:`, error);
                        failedOrders.push(orderIdStr);
                    }
                }
            }

            if (failedOrders.length > 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Some Orders Failed',
                    text: `The following orders could not be updated: ${failedOrders.join(', ')}`,
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Success',
                    text: `Orders have been successfully ${actionType}d.`,
                    showConfirmButton: false,
                    timer: 3000,
                });
            }

            // บังคับดึงข้อมูลใหม่
            setForceFetch((prev) => !prev);
        } catch (error) {
            console.error('Error updating orders:', error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Update Failed',
                text: 'An error occurred while updating the orders. Please try again.',
                showConfirmButton: true,
            });
        }
    };

    const handleSelectAll = () => {
        const selectableOrders = orders
            .filter((order) => ["pending_payment_verification","pending_refound"].includes(order.status))
            .reduce<SelectedOrders>((acc, order) => {
                acc[order.id] = true;
                return acc;
            }, {});

        setSelectedOrders(selectableOrders);
    };

    const handleClearAll = () => {
        setSelectedOrders({});
    };

const handleModelOpen = (src: string) => {
    setSelectedImage(src);
    setIsModalOpen(true);
};

const handleModelClose = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
};
    useEffect(() => {
        console.log("Model:",isModalOpen); 
    },[isModalOpen])

    const columns = useMemo(() => {
        return columnKeysFiltered.map((key) => ({
            header: key === 'slipUrl' ? 'Slip Image' : key.charAt(0).toUpperCase() + key.slice(1),
            accessorKey: key,
            cell: ({ row }: { row: { original: Order } }) => {
                const value = row.original[key as keyof Order];

                if (key === 'slipUrl') {
                    return value ? (
                        <div>
                            <Image 
                                src={value as string} 
                                width={100} 
                                height={100} 
                                alt="Slip Image" 
                                className="cursor-pointer"
                                onClick={() => handleModelOpen(value as string)}
                            />
                        </div>
                    ) : (
                        <div className="text-red-700">No Image</div>
                    );
                }

                if (key === 'items') {
                    return Array.isArray(value) ? (
                        <div>
                            {value.map((item, index) => (
                                <div key={index}>{index + 1}. {item.productName || 'No Name'}</div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-red-700">No Items</div>
                    );
                }

                if (key === 'createdAt' || key === 'updatedAt') {
                    const formatDate = (dateStr: string) => {
                        const options: Intl.DateTimeFormatOptions = {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        };
                        return new Date(dateStr).toLocaleDateString(undefined, options);
                    };
                    
          
                    return <div>{formatDate(value as string)}</div>;
                }

                if (key === 'Select') {
                    return (
                        <div className="flex justify-center">
                            {["pending_payment_verification", "pending_refound"].includes(row.original.status) ? (
                                <input
                                    type="checkbox"
                                    checked={selectedOrders[row.original.id] || false}
                                    onChange={(e) => {
                                        setSelectedOrders((prev) => ({
                                            ...prev,
                                            [row.original.id]: e.target.checked,
                                        }));
                                    }}
                                />
                            ) : (
                                <span>N/A</span>
                            )}
                        </div>
                    );
                }

                return value === null || value === undefined
                    ? ''
                    : typeof value === 'object'
                        ? JSON.stringify(value)
                        : String(value);
            },
        }));
    }, [columnKeysFiltered, selectedOrders]);

    const table = useReactTable({
        data: orders,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleSearchQuery = (e) => {
        e.preventDefault();
        setSearchQuery(tempSearchQuery);
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleColumnToggle = (column) => {
        setColumnKeysFiltered(prev => {
            let updatedColumns = prev.includes(column)
                ? prev.filter(item => item !== column) // ถ้าเลือกซ้ำให้ลบออก
                : [...prev.filter(item => item !== "Select"), column,"Select"]; // เพิ่ม column โดยไม่ให้ "Actions" ถูกแทรกตรงกลาง

            return updatedColumns; // ใส่ "Actions" ไว้ท้ายสุดเสมอ
        });
    };

    const sortByOptions = [
        { orderBy: "asc", orderWith: "createdAt", label: "Oldest Created" },
        { orderBy: "desc", orderWith: "createdAt", label: "Newest Created" },
        { orderBy: "asc", orderWith: "updatedAt", label: "Oldest Updated" },
        { orderBy: "desc", orderWith: "updatedAt", label: "Newest Updated" },
        { orderBy: "asc", orderWith: "totalPrice", label: "Highest Price" },
        { orderBy: "desc", orderWith: "totalPrice", label: "Lowest Price" },
      ];
    


    return (
        <div
            className="min-h-screen flex flex-col my-7 justify-start items-center gap-5"
            style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
        >
            {/* top search filter */}
            <div className="w-full flex justify-between items-center border-gray-300 border-y px-7"
                style={{ backgroundColor: themeColors.base }}
            >
                <SearchAndFilterBar
                    tempSearchQuery={tempSearchQuery}
                    setTempSearchQuery={setTempSearchQuery}
                    handleSearchQuery={handleSearchQuery}
                    columnKeys={columnKeys}
                    columnKeysFiltered={columnKeysFiltered}
                    handleColumnToggle={handleColumnToggle}
                    totalItems={pagination.totalOrders}
                    fromSearch={searchQuery}
                    sortData={sortByOptions}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    orderWith={orderWith}
                    setOrderWith={setOrderWith}
                />
                <div className="flex flex-row gap-2 w-1/2 text-[0.8rem] items-center justify-end">
                    {/* <StatusSelectDropdown status={status} setStatus={setStatus} /> */}
                   
                    <div className="flex flex-row items-center gap-1">
                    <OrderStatusSelectDropdown status={status} setStatus={setStatus} /> 
                        <input
                            type="checkbox"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    handleSelectAll();
                                } else {
                                    handleClearAll();
                                }
                            }}
                        />
                        <div>Select All</div>
                    </div>
                    <select
                        value={actionType}
                        onChange={(e) => setActionType(e.target.value)}
                        className="border p-2 rounded text-black"
                    >
                        <option value="" disabled>
                           Action...
                        </option>
                        <option value="approve">Approve</option>
                        <option value="reject">Reject</option>
                    </select>
                   
                    <button
                        onClick={handleConfirm}
                        className="ml-3 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Confirm
                    </button>
                   
                </div>
            </div>
            <div className='px-10 flex flex-row'>
                {orders.length ? (
                    <DataTable table={table} />
                ) : (
                    <div className="min-h-screen p-7 flex justify-center items-center">
                        <p>No orders to display</p>
                    </div>
                )}
  

            </div>
            <PaginationControls
                pagination={pagination}
                setPagination={setPagination}
            />
            {isModalOpen && selectedImage && (
    <div 
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
        onClick={handleModelClose}
    >
        <div className="relative p-4  rounded-lg">
            <button
                className="absolute top-4 right-4 text-white bg-red-500 px-3 py-1 rounded"
                onClick={handleModelClose}
            >
                X
            </button>
            <Image
                src={selectedImage}
                width={800} 
                height={800}
                alt="Expanded Slip Image"
                className="max-w-full max-h-screen object-contain cursor-pointer"
            />
        </div>
    </div>
)}
        </div>
    );
}

export default PurchaseTable;
