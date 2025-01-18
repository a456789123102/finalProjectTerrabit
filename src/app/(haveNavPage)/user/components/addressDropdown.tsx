import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

interface Address {
  id: string;
  recipientName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AddressDropdownProps {
  addresses: Address[];
  selectedAddress: string;
  handleSelectAddress: (id: string) => void;
  oderId: string;
}
const AddressDropdown: React.FC<AddressDropdownProps> = ({ addresses, selectedAddress,oderId, handleSelectAddress }) => {
  const selectedAddressObj = addresses.find((address) => address.id === selectedAddress);

  return (
    <div className="bg-gray-200 w-full ">
    <Dropdown className="w-full">
      <DropdownTrigger>
        <Button variant="bordered" className="w-full block">
          <div className="text-slate-900 border text-[0.7rem] w-full whitespace-normal break-words text-left ">
            {selectedAddressObj
              ? `${selectedAddressObj.recipientName}, ${selectedAddressObj.street}, ${selectedAddressObj.city}, ${selectedAddressObj.state}, ${selectedAddressObj.zipCode}`
              : "Select an address"}
          </div>
        </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" className="border rounded shadow-lg w-full">
          {addresses
            .filter((address) => address.id !== selectedAddress)
            .map((address) => (
              <DropdownItem
                key={address.id}
                className="bg-gray-100 border-b py-2 text-[0.7rem] my-1 w-full"
              >
                <div
                  onClick={() => handleSelectAddress(oderId,address.id)}
                  className={`p-2 hover:bg-gray-200 text text-slate-700`}
                >
                  {address.recipientName}, {address.street}, {address.city},{" "}
                  {address.state}, {address.zipCode}
                </div>
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </div>

  );
}

export default AddressDropdown;

