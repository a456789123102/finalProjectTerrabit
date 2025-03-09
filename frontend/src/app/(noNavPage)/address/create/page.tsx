"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AddressForm from "../components/addressForm";
import { createAddress } from "../../../apis/address";

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

function CreateAddressPage() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (addressData: AddressData) => {
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
      const response = await createAddress(
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

      if (response) {
        setAlertMessage("Address created successfully!");
        setTimeout(() => {
          router.push("/address/myAddress");
        }, 2000);
      }
    } catch (error) {
      setAlertMessage("Error creating address. Please try again.");
      console.error("Error creating Address:", error);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      {alertMessage && (
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-7 rounded shadow-lg ${
            alertMessage.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {alertMessage}
        </div>
      )}
      <div className="w-2/5 min-w-96 z-10">
        <AddressForm onSubmit={handleSubmit} mode="create" />
      </div>
    </div>
  );
}

export default CreateAddressPage;
