import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useRouter } from 'next/navigation'; 
import { useState } from "react";

export default function AdminMenu() {
  const router = useRouter(); 
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    {
      key: "Dashboards",
      label: "Dashboards",
      path: "/admin/dashboard" 
    },
    {
      key: "ProductManagement",
      label: "Product Management",
      path: "/admin/manage/product" 
    },
    {
      key: "addProductImage",
      label: "Add Product Image",
      path: "/product/create/image" 
    },
    {
        key: "Order Management",
        label: "OrderManagement",
        path: "/admin/manage/purchase"
      },

  ];

  const handleAction = (path: string) => {
    router.push(path); 
  };

  

  return (
    <div className="text-yellow-500 hover:bg-orange-100 cursor-pointer">
      <Dropdown isOpen={isOpen}>
        <DropdownTrigger>
          <Button variant="bordered"
          onMouseEnter={() => {
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            setIsOpen(false);
          }}
          >
            Admin Menu
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          className="bg-[#040D12] text-yellow-500  shadow-md "
          onMouseEnter={() => {
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            setIsOpen(false);
          }}
        >
          {items.map((item) => (
            <DropdownItem
              key={item.key}
              color={item.key === "delete" ? "danger" : "default"}
              className="hover:bg-orange-100 hover:text-yellow-900 p-1"
              onPress={() => handleAction(item.path)} 
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
