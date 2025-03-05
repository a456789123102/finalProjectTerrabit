import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useRouter } from 'next/navigation'; 
import { useState } from "react";
import {FileSliders} from "lucide-react"

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
      label: "Manage Product",
      path: "/admin/manage/product" 
    },
    {
      key: "orderManagement",
      label: "Manage Purchase Order",
      path: "/admin/manage/purchase" 
    },
    {
        key: "UsersManagement",
        label: "Users Management",
        path: "/admin/manage/users"
      },
      {
        key: "FeedbackManagement",
        label: "Feedback Management",
        path: "/admin/manage/feedbacks"
      },


  ];

  const handleAction = (path: string) => {
    router.push(path); 
  };

  

  return (
    <div className="text-yellow-500 hover:bg-orange-100 cursor-pointer bg-blue-500  rounded-sm">
      <Dropdown isOpen={isOpen}>
        <DropdownTrigger>
          <Button variant="bordered" className="text-[0.7rem] flex flex-row gap-1"
          onMouseEnter={() => {
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            setIsOpen(false);
          }}
          >
            <FileSliders size={17}/>
            <div>Admin Menu</div>
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
