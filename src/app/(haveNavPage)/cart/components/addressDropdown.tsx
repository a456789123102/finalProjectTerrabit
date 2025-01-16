import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

function addressDropdown(addresses,selectedAddress,setSelectedAddress) {
  return (
    <div className="flex flex-row items-center h-full p-1" >
      <Dropdown  >
        <DropdownTrigger>
          <Button variant="bordered">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:text-amber-400">
     <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
   </svg>
   
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" className="border">
          {addresses.map((address) => (
         <DropdownItem key={address.id} className={`hover:text-base border-b py-1 text-sm`}>
     <div onClick={() => setSelectedAddress(address.id)} className={`${address.id === selectedAddress ? 'bg-yellow-200' : ''}`}>
    {address.recipientName}, {address.street}, {address.city}, {address.state}, {address.zipCode}
     </div>
         </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default addressDropdown