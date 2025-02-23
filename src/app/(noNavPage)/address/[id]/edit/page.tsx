"use client"
import { updateAddress } from '@/app/apis/address';
import AddressForm from '../../components/addressForm';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface AddressData {
  recipientName: string;
  currentAddress: string;
  city: string;
  state: string;
  zipCode: string;
  mobileNumber: string;
  email?: string;
}

function EditAddressPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
    const handleSubmit = async (addressData:AddressData) => {
        if (!addressData.recipientName || !addressData.currentAddress || !addressData.city || !addressData.state || !addressData.zipCode || !addressData.mobileNumber) {
            console.error("All fields are required");
            return; 
          }
          
        try {
          
            console.log("submit edit")
            const response = await updateAddress(
                id,
                addressData.recipientName, 
                addressData.currentAddress, 
                addressData.city,
                addressData.state,
                addressData.zipCode,
                addressData.mobileNumber,
                addressData.email? addressData.email : undefined 
              );
                console.log('address updated response:', response);
                router.push("/address/myAddress")
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