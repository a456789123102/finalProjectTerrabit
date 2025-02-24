"use client";
import { updateAddress } from '@/app/apis/address';
import AddressForm from '../../components/addressForm';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AddressData {
  recipientName: string;
  currentAddress: string;
  provinceId: number;
  provinceName: string;
  amphureId: number;
  amphureName: string;
  tambonId: number;
  tambonName: string;
  zipCode: string;
  mobileNumber: string;
  email?: string;
}

function EditAddressPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSubmit = async (addressData: AddressData) => {
    // ✅ ตรวจสอบข้อมูลที่จำเป็น
    if (
      !addressData.recipientName ||
      !addressData.currentAddress ||
      !addressData.provinceId ||
      !addressData.provinceName ||
      !addressData.amphureId ||
      !addressData.amphureName ||
      !addressData.tambonId ||
      !addressData.tambonName ||
      !addressData.zipCode ||
      !addressData.mobileNumber
    ) {
      setAlertMessage("All fields are required.");

      setTimeout(() => {
        setAlertMessage(null);
      },3000)
      return;
    }

    try {
      console.log("submit edit");

      // ✅ เรียก API `updateAddress` ด้วยข้อมูลที่ถูกต้อง
      const response = await updateAddress(
        id,
        addressData.recipientName,
        addressData.currentAddress,
        addressData.provinceId,
        addressData.provinceName,
        addressData.amphureId,
        addressData.amphureName,
        addressData.tambonId,
        addressData.tambonName,
        addressData.zipCode,
        addressData.mobileNumber,
        addressData.email || ""
      );

      console.log('✅ Address updated response:', response);
      router.push("/address/myAddress");
    } catch (error) {
      console.error('❌ Error updating Address:', error);
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-2/5 min-w-96 '>
        <AddressForm onSubmit={handleSubmit} mode="edit" /> 
      </div>
    </div>
  );
}

export default EditAddressPage;
