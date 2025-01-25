'use client';
import React, { useMemo, useState } from 'react'
import { useTheme } from '@/app/context/themeContext';
import PaginationControls from '../components/PaginationControls';
import useFetchOrders from '../hooks/orders/useFetchOrders';
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DataTable from "../components/dataTable";
import Image from 'next/image'
import StatusSelectDropdown from './components/statusSelectDropdown';


function PurchaseTable() {
    const [status, setStatus] = useState([])
    const { themeColors } = useTheme();
    const orders = useFetchOrders(status);
    console.log("orders:", orders)
    const [columnKeysFiltered, setColumnKeysFiltered] = useState([
        'userId', "items", "totalPrice", "slipUrl", "createdAt", "status", "Actions"
    ]);

    //หัวตาราง
    const columnKeys = useMemo(() => {
        if (!orders.length) return [];
        return [...Object.keys(orders[0]), "Actions"];
    }, [orders]);

    const columns = useMemo(() => {
        return columnKeysFiltered.map((key) => ({
            header: key === "slipUrl" ? "slip Image" : key.charAt(0).toUpperCase() + key.slice(1),
            accessorKey: key,
            cell: ({ row }: { row: { original: Record<string, any> } }) => {
                const value = row.original[key];
                if (key === "slipUrl") {
                    return value ? (
                        <Image
                            src={value}
                            width={200}
                            height={200}
                            alt={key}
                        />
                    ) : <div className='text-red-700'>No Image</div>;
                }
                if (key === "items") {
                    return value && Array.isArray(value) ? (
                        <div>
                            {value.map((e, i) => (
                                <div key={i}>
                                    {i + 1}. {e.productName || "No Name"}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-red-700">No Items</div>
                    );
                }
                if (key === "createdAt") {
                    const formatDate = (value) => {
                        const options = {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        };
                        return new Date(value).toLocaleDateString(undefined, options);
                    };                    
                    return <div>{formatDate(value)}</div>;
                }

                if (key === "Actions") {
                    return (
                        <div className="flex flex-row justify-center gap-1">
                            {['awaiting_confirmation', 'awaiting_rejection'].includes(row.original.status) ? (
                                <input
                                    type="checkbox"
                                    checked={row.original.status === 'awaiting_confirmation'}
                                    onChange={() => {
                                        // Handle checkbox state or actions here
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
    }, [columnKeysFiltered]);

    const table = useReactTable({
        data: orders,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    if (!orders.length) {
        return (
            <div className="min-h-screen p-7 flex justify-center items-center">
                <p>No orders to display</p>
            </div>
        );
    }
    

    return (
        <div
            className="min-h-screen p-7 flex flex-col justify-start items-center gap-5"
            style={{ backgroundColor: themeColors.navbar, color: themeColors.text }}>
            <div className="w-full flex justify-between items-center border p-4">

                <div>header section</div>
                <div>
                    <StatusSelectDropdown
                        status={status}
                        setStatus={setStatus}
                    />
                </div>
                <div>header section3</div>
            </div>
            <div>
                <DataTable table={table} />
            </div>
        </div>
    )
}

export default PurchaseTable