import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useRouter } from 'next/navigation'; 
import { useState } from "react";

export default function AdminMenu() {
  const router = useRouter(); 
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    {
      key: "Dashboards",
      label: "All web Data",
      path: "/admin/dashboard" 
    },
    {
      key: "Products",
      label: "",
      path: "admin/product" 
    },
    {
      key: "addProductImage",
      label: "Add Product Image",
      path: "/product/create/image" 
    },
    {
        key: "CreateCategory",
        label: "Create Category",
        path: "/product/category/create"
      },

  ];

  const handleAction = (path: string) => {
    router.push(path); 
  };

  

  return (
    <div className="text-yellow-600 hover:bg-orange-100 cursor-pointer">
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
          disabledKeys={["addProductImage", "delete"]}
          aria-label="Dynamic Actions"
          className="bg-[#040D12] text-yellow-600  shadow-md "
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
              className="hover:bg-orange-100"
              onClick={() => handleAction(item.path)} 
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
