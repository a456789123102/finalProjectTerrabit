"use client"
import React from 'react';
import AddressForm from '../components/addressForm'; 

import { createAddress } from '../../../apis/address';  

interface AddressData {
    recipientName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }

function CreateAddressPage() {
    const handleSubmit = async (addressData:AddressData) => {
        if (!addressData.recipientName || !addressData.street || !addressData.city || !addressData.state || !addressData.zipCode) {
            console.error("All fields are required");
            return; 
          }
          
        try {
            console.log("submit create")
            const response = await createAddress(
                addressData.recipientName, 
                addressData.street, 
                addressData.city,
                addressData.state,
                addressData.zipCode);
                console.log('address created response:', response);
        } catch (error) {
            console.error('Error creating Address:', error);
        }
    }

  return (
<div className='w-full h-screen flex justify-center items-center'>
<div className='w-2/5 min-w-96 '>
  <AddressForm onSubmit={handleSubmit} mode="create" /> 
</div>
</div>

  );
}

export default CreateAddressPage;
