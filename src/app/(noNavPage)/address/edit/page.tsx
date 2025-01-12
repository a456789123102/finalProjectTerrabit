import React from 'react'
import { updateAddress } from '@/app/apis/address';
import AddressForm from '../components/addressForm';

interface AddressData {
  recipientName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

function EditAddressPage() {

    const handleSubmit = async (addressData:AddressData) => {
        if (!addressData.recipientName || !addressData.street || !addressData.city || !addressData.state || !addressData.zipCode) {
            console.error("All fields are required");
            return; 
          }
          
        try {
            console.log("submit create")
            const response = await updateAddress(
                addressData.recipientName, 
                addressData.street, 
                addressData.city,
                addressData.state,
                addressData.zipCode);
                console.log('address updated response:', response);
        } catch (error) {
            console.error('Error updating Address:', error);
        }
    }

  return (
<div className='w-full h-screen flex justify-center items-center'>
<div className='w-2/5 min-w-96 '>
  <AddressForm onSubmit={handleSubmit} mode="edit" /> 
</div>
</div>
  )
}

export default EditAddressPage