'use client';

import React, { useMemo, useState } from 'react';
import { useTheme } from '@/app/context/themeContext';
import PaginationControls from '../components/PaginationControls';
import useFetchOrders from '../hooks/orders/useFetchOrders';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import DataTable from '../components/dataTable';
import Image from 'next/image';
import StatusSelectDropdown from './components/statusSelectDropdown';
import Swal from 'sweetalert2';
import { updateOrderStatus } from '@/app/apis/order';

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
    const [actionType, setActionType] = useState<'approve' | 'reject'>('reject'); // Default action type
    const [pagination, setPagination] = useState<PaginationState>({
        page: 1,
        pageSize: 10,
        totalPages: 1,
        totalOrders: 0,
    });
  const [forceFetch, setForceFetch] = useState(false); 

    const orders: Order[] = useFetchOrders(status,forceFetch); // Ensure useFetchOrders returns an Order[]

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

    const handleApprove = async (orderId: number, currentStatus: string) => {
        try {
            const validStatus = ['awaiting_confirmation', 'awaiting_rejection']
            if (!validStatus.includes(currentStatus)) {
                console.error(`Invalid status: ${currentStatus}. Expected 'awaiting_confirmation' or 'awaiting_rejection'`);
                return;
            }
            let updatedStatus = ""
            if (currentStatus === 'awaiting_confirmation') {
                updatedStatus = 'order_approved';
            } else if (currentStatus === 'awaiting_rejection') {
                updatedStatus = 'order_cancelled';
            }
            console.log(`Order ${orderId} approved from status${currentStatus} with new status: ${updatedStatus}`);
            const res = await updateOrderStatus(orderId, updatedStatus);

        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const handleReject = async (orderId: number, currentStatus: string) => {
        try {
          const validStatus = ['awaiting_confirmation', 'awaiting_rejection'];
          if (!validStatus.includes(currentStatus)) {
            console.error(`Invalid status: ${currentStatus}. Expected 'awaiting_confirmation' or 'awaiting_rejection'`);
            return;
          }
      
          const updatedStatus = 'order_rejected';
          console.log(`Order ${orderId} rejected from status ${currentStatus} with new status: ${updatedStatus}`);
          
          // Call API to update order status
          const res = await updateOrderStatus(orderId, updatedStatus);
          console.log(`Order ${orderId} status updated successfully to: ${updatedStatus}`);
        } catch (error) {
          console.error('Failed to reject status', error);
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
          
          // ใช้ for...of เพื่อจัดการ asynchronous อย่างถูกต้อง
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
                  await handleApprove(orderId, order.status);
                } else if (actionType === 'reject') {
                  await handleReject(orderId, order.status);
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
            .filter((order) => ['awaiting_confirmation', 'awaiting_rejection'].includes(order.status))
            .reduce<SelectedOrders>((acc, order) => {
                acc[order.id] = true;
                return acc;
            }, {});

        setSelectedOrders(selectableOrders);
    };

    const handleClearAll = () => {
        setSelectedOrders({});
    };

    const columns = useMemo(() => {
        return columnKeysFiltered.map((key) => ({
            header: key === 'slipUrl' ? 'Slip Image' : key.charAt(0).toUpperCase() + key.slice(1),
            accessorKey: key,
            cell: ({ row }: { row: { original: Order } }) => {
                const value = row.original[key as keyof Order];

                if (key === 'slipUrl') {
                    return value ? (
                        <Image src={value as string} width={200} height={200} alt="Slip Image" />
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

                if (key === 'createdAt') {
                    const formatDate = (dateStr: string) => {
                        const options: Intl.DateTimeFormatOptions = {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        };
                        return new Date(dateStr).toLocaleDateString(undefined, options);
                    };

                    return <div>{formatDate(value as string)}</div>;
                }

                if (key === 'Select') {
                    return (
                        <div className="flex justify-center">
                            {['awaiting_confirmation', 'awaiting_rejection'].includes(row.original.status) ? (
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

    return (
        <div
            className="min-h-screen p-7 flex flex-col justify-start items-center gap-5"
            style={{ backgroundColor: themeColors.navbar, color: themeColors.text }}
        >
            <div className="w-full flex justify-between items-center border p-4">
                <div>header section</div>

                <div className="flex flex-row gap-2 text-[0.8rem]">
                    <div>Status:</div>
                    <StatusSelectDropdown status={status} setStatus={setStatus} />
                    <div className="flex flex-row items-center gap-1">
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
                        onChange={(e) => setActionType(e.target.value as 'approve' | 'reject')}
                        className="border p-2 rounded text-black"
                    >
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
            <div>
                {orders.length ? (
                    <DataTable table={table} />
                ) : (
                    <div className="min-h-screen p-7 flex justify-center items-center">
                        <p>No orders to display</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PurchaseTable;
