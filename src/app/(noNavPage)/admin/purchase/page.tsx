'use client';
import React, { useState } from 'react'
import { useTheme } from '@/app/context/themeContext';

function PurchaseTable() {
    const[status,setStatus] = useState([])
    const { themeColors } = useTheme();

    const orders = useFetchOrder(status)
    return (
        <div
            className="min-h-screen p-7 flex flex-col justify-start items-center gap-5"
            style={{ backgroundColor: themeColors.navbar, color: themeColors.text }}>
            <div className="w-full flex justify-between items-center border p-4">
                <div>header section</div>
                <div>header section2</div>
                <div>header section3</div>
            </div>
            <div>table section</div>
        </div>
    )
}

export default PurchaseTable