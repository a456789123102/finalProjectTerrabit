"use client";
import React, { useMemo, useState } from 'react';
import { useTheme } from '@/app/context/themeContext';
import PaginationControls from '../components/PaginationControls';
import useFetchOrders from '../hooks/orders/useFetchOrders';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import DataTable from '../components/dataTable';
import Image from 'next/image';
import StatusSelectDropdown from './components/statusSelectDropdown';
import { Input } from '@nextui-org/react';

function PurchaseTable() {
    const [status, setStatus] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState({});
      const [searchQuery, setSearchQuery] = useState("");
      const [tempSearchQuery, setTempSearchQuery] = useState("");
    const [actionType, setActionType] = useState(''); // Default action
    const { themeColors } = useTheme();
    const orders = useFetchOrders(status);
    const [columnKeysFiltered, setColumnKeysFiltered] = useState([
        'userId', 'items', 'totalPrice', 'slipUrl', 'createdAt', 'status', 'Select'
    ]);
      const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
        totalPages: 1,
        totalOrders: 0,
      });

    // Table column keys
    const columnKeys = useMemo(() => {
        if (!orders.length) return [];
        return [...Object.keys(orders[0]), 'Select'];
    }, [orders]);

    const handleApprove = (orderId, currentStatus) => {
        let updatedStatus;
        if (currentStatus === 'awaiting_confirmation') {
            updatedStatus = 'order_approved';
        } else if (currentStatus === 'awaiting_rejection') {
            updatedStatus = 'order_cancelled';
        }
        console.log(`Order ${orderId} approved with new status: ${updatedStatus}`);
        // Implement API call or state update here
    };

    const handleReject = (orderId, currentStatus) => {
        let updatedStatus = 'order_rejected';
        console.log(`Order ${orderId} rejected with new status: ${updatedStatus}`);
        // Implement API call or state update here
    };

    const handleConfirm = () => {
        Object.entries(selectedOrders).forEach(([orderId, isSelected]) => {
            if (isSelected) {
                const order = orders.find((o) => o.id === orderId);
                if (actionType === 'approve') {
                    handleApprove(orderId, order.status);
                } else if (actionType === 'reject') {
                    handleReject(orderId, order.status);
                }
            }
        });
    };

    const handleSelectAll = () => {
        const selectableOrders = orders.filter((order) => ['awaiting_confirmation', 'awaiting_rejection'].includes(order.status))
            .reduce((acc, order) => { acc[order.id] = true; return acc }, {});
        setSelectedOrders(selectableOrders);
    }

    const handleClearAll = () => {
        setSelectedOrders({});
    };

    const columns = useMemo(() => {
        return columnKeysFiltered.map((key) => ({
            header: key === 'slipUrl' ? 'Slip Image' : key.charAt(0).toUpperCase() + key.slice(1),
            accessorKey: key,
            cell: ({ row }) => {
                const value = row.original[key];

                if (key === 'slipUrl') {
                    return value ? (
                        <Image src={value} width={200} height={200} alt={key} />
                    ) : (
                        <div className="text-red-700">No Image</div>
                    );
                }

                if (key === 'items') {
                    return value && Array.isArray(value) ? (
                        <div>
                            {value.map((e, i) => (
                                <div key={i}>{i + 1}. {e.productName || 'No Name'}</div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-red-700">No Items</div>
                    );
                }

                if (key === 'createdAt') {
                    const formatDate = (value) => {
                        const options = {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        };
                        return new Date(value).toLocaleDateString(undefined, options);
                    };
                    return <div>{formatDate(value)}</div>;
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
                                            [row.original.id]: e.target.checked
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
            }
        }));
    }, [columnKeysFiltered, selectedOrders]);

    const table = useReactTable({
        data: orders,
        columns,
        getCoreRowModel: getCoreRowModel()
    });


    return (
        <div
            className="min-h-screen p-7 flex flex-col justify-start items-center gap-5"
            style={{ backgroundColor: themeColors.navbar, color: themeColors.text }}>
            <div className="w-full flex justify-between items-center border p-4">
                <div>header section</div>

                <div className='flex flex-row gap-2 text-[0.8rem]'>
                    <div>
                        searchbar
                    </div>
                <div>
                    <StatusSelectDropdown
                        status={status}
                        setStatus={setStatus}
                    />
                </div>
                    <div className='flex flex-row items-center gap-1'>
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
                        className="border p-2 rounded text-black">
                        <option value="approve">Approve</option>
                        <option value="reject">Reject</option>
                    </select>
                    <button
                        onClick={handleConfirm}
                        className="ml-3 bg-blue-500 text-white px-4 py-2 rounded">
                        Confirm
                    </button>
                </div>
            </div>
            <div>
                {orders.length ? <DataTable table={table} /> : <div className="min-h-screen p-7 flex justify-center items-center">
                    <p>No orders to display</p>
                </div>}
            </div>
        </div>
    );
}

export default PurchaseTable;
