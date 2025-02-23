"use client";

import { getAmphure, getOneAddress, getProvince, getTambon } from "@/app/apis/address";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface AddressFormProps {
  onSubmit: (addressData: any) => Promise<void>;
  mode: "create" | "edit";
}

interface Location {
  id: number;
  name_th: string;
  name_en: string;
}

function AddressForm({ onSubmit, mode }: AddressFormProps) {
  const [recipientName, setRecipientName] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [amphureId, setAmphureId] = useState<number | null>(null);
  const [tambonId, setTambonId] = useState<number | null>(null);
  const [zipCode, setZipCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  // Dropdown data
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [amphures, setAmphures] = useState<Location[]>([]);
  const [tambons, setTambons] = useState<Location[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getProvince();
        setProvinces(response);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (provinceId) {
      const fetchAmphures = async () => {
        try {
          const response = await getAmphure(provinceId);
          setAmphures(response);
          setAmphureId(null);
          setTambons([]);
        } catch (error) {
          console.error("Error fetching amphures:", error);
        }
      };
      fetchAmphures();
    }
  }, [provinceId]);

  useEffect(() => {
    if (amphureId) {
      const fetchTambons = async () => {
        try {
          const response = await getTambon(amphureId);
          setTambons(response);
          setTambonId(null);
        } catch (error) {
          console.error("Error fetching tambons:", error);
        }
      };
      fetchTambons();
    }
  }, [amphureId]);

  useEffect(() => {
    if (tambonId) {
      const selectedTambon = tambons.find((t) => t.id === tambonId);
      if (selectedTambon) {
        setZipCode(selectedTambon.zip_code || "");
      }
    }
  }, [tambonId, tambons]);

  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchAddress = async () => {
        try {
          const response = await getOneAddress(Number(id));
          if (response.address) {
            const address = response.address;
            setRecipientName(address.recipientName || "");
            setCurrentAddress(address.currentAddress || "");
            setProvinceId(address.provinceId || null);
            setAmphureId(address.amphureId || null);
            setTambonId(address.tambonId || null);
            setZipCode(address.zipCode || "");
            setMobileNumber(address.mobileNumber || "");
            setEmail(address.email || "");
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      };
      fetchAddress();
    }
  }, [mode, id]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const addressData = {
      recipientName,
      currentAddress,
      provinceId,
      amphureId,
      tambonId,
      zipCode,
      mobileNumber,
      email,
    };
    try {
      await onSubmit(addressData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-6 px-14 bg-white shadow-md w-full">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
        {mode === "create" ? "Create Your Address" : "Edit Your Address"}
      </h2>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-800">Recipient Name:</label>
        <input className=" p-2 px-5 border border-gray-300" type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} required />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-800">Current Address:</label>
        <input className=" p-2 px-5 border border-gray-300" type="text" value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} required />
      </div>

      {/* Province Dropdown */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-600">Province:</label>
        <select className="input-field" value={provinceId || ""} onChange={(e) => setProvinceId(Number(e.target.value))} required>
          <option value="">Select Province</option>
          {provinces.map((prov) => (
            <option key={prov.id} value={prov.id}>
              {prov.name_th}
            </option>
          ))}
        </select>
      </div>

      {/* Amphure Dropdown */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-600">Amphure:</label>
        <select className="input-field" value={amphureId || ""} onChange={(e) => setAmphureId(Number(e.target.value))} required>
          <option value="">Select Amphure</option>
          {amphures.map((amp) => (
            <option key={amp.id} value={amp.id}>
              {amp.name_th}
            </option>
          ))}
        </select>
      </div>

      {/* Tambon Dropdown */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-600">Tambon:</label>
        <select className="input-field" value={tambonId || ""} onChange={(e) => setTambonId(Number(e.target.value))} required>
          <option value="">Select Tambon</option>
          {tambons.map((tam) => (
            <option key={tam.id} value={tam.id}>
              {tam.name_th}
            </option>
          ))}
        </select>
      </div>

      {/* Zip Code (Read Only) */}
      <div className="flex flex-row items-baseline gap-2">
        <label className="font-medium text-gray-800">Zip Code:</label>
        <input className="p-1 px-5 border border-gray-300" type="text" value={zipCode} readOnly />
      </div>

<div className="self-center">
<button type="submit" className="p-3 px-4 border bg-blue-600 text-white">
        {mode === "create" ? "Create Address" : "Update Address"}
      </button>
</div>
    </form>
  );
}

export default AddressForm;
