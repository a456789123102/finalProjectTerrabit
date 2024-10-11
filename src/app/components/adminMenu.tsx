import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useRouter } from 'next/navigation'; // Import useRouter สำหรับการนำทาง

export default function AdminMenu() {
  const router = useRouter(); // ใช้ useRouter สำหรับการนำทาง

  // เพิ่ม path สำหรับแต่ละ item
  const items = [
    {
      key: "allWebData",
      label: "All web Data",
      path: "/dashboard" 
    },
    {
      key: "createProduct",
      label: "Create Product",
      path: "/product/create" // เส้นทางเมื่อคลิก "Copy link"
    },
    {
      key: "addProductImage",
      label: "Add Product Image",
      path: "/product/create/image" // เส้นทางเมื่อคลิก "Edit file"
    },
    {
        key: "CreateCategory",
        label: "Create Category",
        path: "/product/category/create" // เส้นทางเมื่อคลิก "Edit file"
      },
    {
      key: "delete",
      label: "Delete file",
      path: "/delete-file" // เส้นทางเมื่อคลิก "Delete file"
    }
  ];

  const handleAction = (path: string) => {
    router.push(path); // ใช้ path ที่กำหนดในแต่ละ item เพื่อนำทาง
  };

  return (
    <div className="text-yellow-600 hover:bg-orange-100 cursor-pointer">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">
            Admin Menu
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disabledKeys={["addProductImage", "delete"]}
          aria-label="Dynamic Actions"
          className="bg-[#040D12] text-yellow-600  shadow-md rounded-lg" // เพิ่มคลาสหรือสไตล์สำหรับพื้นหลัง
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
