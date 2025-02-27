import React, { useMemo } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useTheme } from '@/app/context/themeContext';
import { FilterX } from 'lucide-react';
interface Status {
  key: string;
  label: string;
}

interface StatusSelectDropdownProps {
  status: string[]; // Initial selected status (array of key strings)
  setStatus: React.Dispatch<React.SetStateAction<string[]>>;
}
const OrderStatusSelectDropdown = ({ status, setStatus }: StatusSelectDropdownProps) => {
  const {themeColors } = useTheme();
      const statuses = useMemo(() => [
        { key: "pending_payment_proof", label: "To Pay" },
        { key: "pending_payment_verification", label: "Awaiting Confirmed" },
        { key: "pending_refound", label: "To Refound" },
        { key: "payment_verified", label: "Payment Verified" },
        { key: "cancelled_by_admin", label: "Cancelled by Admin" },
        { key: "cancelled_by_user", label: "Cancelled by User" },
        { key: "refund_completed", label: "Refund Completed" },
        { key: "refund_rejected", label: "Refund Rejected" },
      ], []);

      const handleOnchange = (key: string) => {
        const newStatus = [...status];
        if (newStatus.includes(key)) {
          newStatus.splice(newStatus.indexOf(key), 1);
        } else {
          newStatus.push(key);
        }
        setStatus(newStatus);
      };

   

  return (
    <div className="flex flex-row items-center h-full p-1 pt-2 " >
    <Dropdown style={{ backgroundColor: themeColors.tertiary}} >
      <DropdownTrigger>
        <Button variant="bordered">
          <FilterX size={27} className="text-gray-500 hover:text-black cursor-pointer"/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" className="border">
        {statuses.map((key) => (
          <DropdownItem key={key.key} className={`hover:text-base border-b py-1 text-sm`}>
            <label className="flex items-center ">
              <input
                type="checkbox"
                checked={status.includes(key.key)}
                onChange={() => handleOnchange(key.key)}
                className="mr-2 "
              />
              {key.label}
            </label>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  </div>
  )
}

export default OrderStatusSelectDropdown