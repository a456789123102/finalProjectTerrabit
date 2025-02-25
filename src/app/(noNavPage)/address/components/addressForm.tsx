"use client";

import { getAmphure, getOneAddress, getProvince, getTambon } from "@/app/apis/address";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Select from "react-select";

interface AddressFormProps {
  onSubmit: (addressData: any) => Promise<void>;
  mode: "create" | "edit";
}

interface Location {
  id: number;
  name_th: string;
}

function AddressForm({ onSubmit, mode }: AddressFormProps) {
  const [recipientName, setRecipientName] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [provinceName, setProvinceName] = useState("");
  const [amphureId, setAmphureId] = useState<number | null>(null);
  const [amphureName, setAmphureName] = useState("");
  const [tambonId, setTambonId] = useState<number | null>(null);
  const [tambonName, setTambonName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  // Dropdown data
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [amphures, setAmphures] = useState<Location[]>([]);
  const [tambons, setTambons] = useState<Location[]>([]);

  const { id } = useParams();

  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchAddress = async () => {
        try {
          const response = await getOneAddress(Number(id));
          if (response.address) {
            const address = response.address[0];
            setRecipientName(address.recipientName || "");
            setCurrentAddress(address.currentAddress || "");
            setProvinceId(address.provinceId);
            setProvinceName(address.provinceName || "");
            setAmphureId(address.amphureId);
            setAmphureName(address.amphureName || "");
            setTambonId(address.tambonId);
            setTambonName(address.tambonName || "");
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

  /** โหลดข้อมูลจังหวัด */
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
    if (provinceId !== null) {
      console.log("Fetching Amphures for Province ID:", provinceId);
      const fetchAmphures = async () => {
        try {
          const response = await getAmphure(provinceId);
          setAmphures(response);
          if (mode !== "edit") {
            setAmphureId(null);
            setAmphureName("");
            setTambons([]);
            setTambonId(null);
            setTambonName("");
            setZipCode("");
          }
        } catch (error) {
          console.error("Error fetching amphures:", error);
        }
      };
      fetchAmphures();
    }
  }, [provinceId]);

  useEffect(() => {
    if (amphureId !== null) {
      console.log("Fetching Tambons for Amphure ID:", amphureId);
      const fetchTambons = async () => {
        try {
          const response = await getTambon(amphureId);
          setTambons(response);

          if (mode !== "edit") {
            setTambonId(null);
            setTambonName("");
            setZipCode("");
          }
        } catch (error) {
          console.error("Error fetching tambons:", error);
        }
      };
      fetchTambons();
    }
  }, [amphureId]);

  /** โหลดข้อมูลที่อยู่เมื่ออยู่ในโหมดแก้ไข */
  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchAddress = async () => {
        try {
          const response = await getOneAddress(Number(id));
          if (response.address) {
            const address = response.address;
            console.log("Fetched address:", address);

            setRecipientName(address.recipientName || "");
            setCurrentAddress(address.currentAddress || "");
            setProvinceId(address.provinceId);
            setProvinceName(address.provinceName || "");
            setAmphureId(address.amphureId);
            setAmphureName(address.amphureName || "");
            setTambonId(address.tambonId);
            setTambonName(address.tambonName || "");
            setZipCode(address.zipCode || "");
            setMobileNumber(address.mobileNumber || "");
            if(address.email){
              setEmail(address.email || "");
              setIsEmailChecked(true);
            }
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      };
      fetchAddress();
    }
  }, [mode, id]);

 const emailFiltered = isEmailChecked && email ? email: "";

  /** บันทึกข้อมูล */
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const addressData = {
      recipientName,
      currentAddress,
      provinceId,
      provinceName,
      amphureId,
      amphureName,
      tambonId,
      tambonName,
      zipCode,
      mobileNumber,
      emailFiltered,
    };
    console.log("Submitting address data:", addressData);
    try {
      await onSubmit(addressData);
    } catch (error) {
      console.log(error);
    }
  };

  /** เลือกจังหวัด */
  const handleProvinceChange = (selectedOption) => {
    if (!selectedOption) return;
    setProvinceId(selectedOption.value);
    setProvinceName(selectedOption.label);

    if (mode !== "edit") {
      setAmphureId(null);
      setAmphureName("");
      setTambonId(null);
      setTambonName("");
      setZipCode("");
      setAmphures([]);
      setTambons([]);
    }
  };

  /** เลือกอำเภอ */
  const handleAmphureChange = (selectedOption) => {
    if (!selectedOption) return;
    setAmphureId(selectedOption.value);
    setAmphureName(selectedOption.label);

    if (mode !== "edit") {
      setTambonId(null);
      setTambonName("");
      setZipCode("");
    }
  };

  /** เลือกตำบล */
  const handleTambonChange = (selectedOption) => {
    if (!selectedOption) return;
    const foundTambon = tambons.find((t) => t.id === selectedOption.value);
    setTambonId(selectedOption.value);
    setTambonName(selectedOption.label);
    setZipCode(foundTambon ? String(foundTambon.zip_code) : "");
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-6 px-14 bg-white shadow-md w-full">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
        {mode === "create" ? "Create Your Address" : "Edit Your Address"}
      </h2>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-600">Recipient Name:</label>
        <input className="p-2 px-5 border border-gray-300" type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} required />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-600">Current Address:</label>
        <input className="p-2 px-5 border border-gray-300" type="text" value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} required />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-600">Phone Number:</label>
        <input className="p-2 px-5 border border-gray-300" type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value.replace(/\D/, ""))} maxLength={10} required />
      </div>

<div className="flex flex-row gap-4">
<div className="flex flex-col gap-1 w-1/2">
        <label className="font-medium text-gray-600">Province:</label>
        <Select
          options={provinces.map((prov) => ({ value: prov.id, label: prov.name_th }))}
          onChange={handleProvinceChange}
          value={provinceId ? { value: provinceId, label: provinceName } : null}
        />
      </div>

      <div className="flex flex-col gap-1 w-1/2">
        <label className="font-medium text-gray-600">Amphure:</label>
        <Select
          options={amphures.map((amp) => ({ value: amp.id, label: amp.name_th }))}
          onChange={handleAmphureChange}
          value={amphureId ? { value: amphureId, label: amphureName } : null}
          isDisabled={amphures.length === 0}
        />
      </div>
</div>

<div className="flex flex-row gap-4 place-items-stretch ">
  <div className="flex flex-col gap-1 w-1/2">
    <label className="font-medium text-gray-600">Tambon:</label>
    <Select
      options={tambons.map((tam) => ({ value: tam.id, label: tam.name_th }))}
      onChange={handleTambonChange}
      value={tambonId ? { value: tambonId, label: tambonName } : null}
      isDisabled={tambons.length === 0}
    />
  </div>
  <div className="flex flex-row items-end gap-2">
    <label className="font-medium text-gray-600 whitespace-nowrap">Zip Code:</label>
    <div className="flex flex-row gap-1 border border-gray-300 px-3 py-2 rounded-[4px] min-w-[80px] justify-center">
      {(() => {
        const val = zipCode ? String(zipCode) : "00000";
        return val.split("").map((e, i) => (
          <div className="p-1 px-2 border border-gray-300 bg-white text-gray-700" key={i}>
            {e}
          </div>
        ));
      })()}
    </div>
  </div>
</div>
<div className="flex gap-2 flex-col">
<div className="flex flex-row gap-2">
<input
  type="checkbox"
  checked={isEmailChecked}
  onChange={() => setIsEmailChecked(!isEmailChecked)}
  className="w-4 h-4"
/>
<div className="font-medium text-gray-600  text-[0.8rem]">
  Receive Purchase Details via Email
</div>
</div>
{(isEmailChecked || email) && (
  <input 
    className="p-2 px-5 border w-2/3 border-gray-300" 
    type="text" 
    value={email} 
    onChange={(e) => setEmail(e.target.value)} 
    required 
  />
)}

    </div>


      <div className="flex justify-center mt-7">
        <button type="submit" className="p-3 px-10 border bg-blue-600 hover:bg-blue-500 rounded-[4px] text-white">
          {mode === "create" ? "Create Address" : "Update Address"}
        </button>
      </div>
    </form>
  );
}

export default AddressForm;
