'use client';
import React, { useMemo, useState } from 'react'
import { useTheme } from '@/app/context/themeContext';
import useFetchOrders from '../hooks/orders/useFetchOrders';
import { getCoreRowModel, useReactTable} from "@tanstack/react-table";
import DataTable from "../components/dataTable";


function PurchaseTable() {
    const[status,setStatus] = useState(["awaiting_slip_upload","awaiting_confirmation"])
    const { themeColors } = useTheme();
    const orders = useFetchOrders(status);
    console.log("Orderssss:",orders)

    //หัวตาราง
const columnKeys = useMemo(() =>{
    if(!orders.length) return [];
    return [...Object.keys(orders[0]),"Actions"];
},[orders]);

const columns = useMemo(() => {
    return columnKeys.map((key) => ({
        header: key.charAt(0).toUpperCase() + key.slice(1),
        accessorKey: key,
        cell: ({ row }) => {
            const value = row.original[key];
            return value === null || value === undefined 
                ? '' 
                : typeof value === 'object' 
                    ? JSON.stringify(value) 
                    : String(value);
        }
    }));
}, [columnKeys]);

const table = useReactTable({
    data : orders,
    columns,
     getCoreRowModel: getCoreRowModel(),
});

    return (
        <div
            className="min-h-screen p-7 flex flex-col justify-start items-center gap-5"
            style={{ backgroundColor: themeColors.navbar, color: themeColors.text }}>
            <div className="w-full flex justify-between items-center border p-4">

                <div>header section</div>
                <div>header section2</div>
                <div>header section3</div>
            </div>
            <div>
            <DataTable table={table} />
            </div>
        </div>
    )
}

export default PurchaseTable