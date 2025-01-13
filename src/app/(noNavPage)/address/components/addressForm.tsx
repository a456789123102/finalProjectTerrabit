'use client'
import { getOwnAddress } from '@/app/apis/address';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AddressFormProps {
  onSubmit: (addressData: any) => Promise<void>;
  mode: 'create' | 'edit';
}

function AddressForm({ onSubmit, mode }: AddressFormProps) {
  const [recipientName, setRecipientName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const router = useRouter();

  const fetchAddress = async () => {
    try {
      const response = await getOwnAddress();
      const address = response.address; // Extract the address object
      console.log('address:::', address);

      if (address) {
        if (mode === 'edit') {
          // Set values for edit mode
          setRecipientName(address.recipientName);
          setStreet(address.street);
          setCity(address.city);
          setState(address.state);
          setZipCode(address.zipCode);
        } else if (mode === 'create') {
          // Redirect to edit page if address exists
          router.push('/address/edit');
        }
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [mode]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const addressData = { recipientName, street, city, state, zipCode };
    try {
      await onSubmit(addressData);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-6 px-14 bg-white shadow-md w-full ">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
        {mode === 'create' ? 'Create Your Address' : 'Your Address'}
      </h2>
      <div className='flex flex-col'>
        <label className="font-medium text-gray-600 pr-3">Recipient Name:</label>
        <input
          className="px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          required
        />
      </div>
      <div className='flex flex-col'>
        <label className="font-medium text-gray-600 pr-3">Street:</label>
        <input
          className="px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />
      </div>
      <div className='flex flex-col'>
        <label className="font-medium text-gray-600 pr-3">City:</label>
        <input
          className="px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div className='flex flex-col'>
        <label className="font-medium text-gray-600 pr-3">State:</label>
        <input
          className="px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </div>
      <div className='flex flex-col'>
        <label className="font-medium text-gray-600 pr-3">Zipcode:</label>
        <input
          className="px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="w-2/3 px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 self-center">
        {mode === 'create' ? 'Create Address' : 'Update Address'}
      </button>
    </form>
  );
}

export default AddressForm;
