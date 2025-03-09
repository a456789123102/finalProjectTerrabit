"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { changePassword,logout } from "@/app/apis/auth"; 
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/zustand";

interface DataProps {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}



const schema = z.object({
  oldPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmNewPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New passwords do not match",
  path: ["confirmNewPassword"],
});

function ChangePwBox() {
  const router = useRouter();
  const {clearUser } = useUserStore();
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async(data: DataProps)  => {
    try {
      await changePassword(data.oldPassword, data.newPassword); 
      Swal.fire({
        icon: "success",
        title: "Password Changed",
        text: "Your password has been updated successfully!",
      });
      await logout();
      clearUser(); 
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Change Password",
        text: (error as any).response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4 p-4 border rounded-md shadow-md">
      {/* Old Password */}
      <div>
        <label className="text-sm font-medium text-gray-700">Current Password</label>
        <div className="relative">
          <input
            type={showPassword.old ? "text" : "password"}
            {...register("oldPassword")}
            placeholder="Enter your current password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <span
            className="absolute right-2 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => ({ ...prev, old: !prev.old }))}
          >
            {showPassword.old ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}
      </div>

      {/* New Password */}
      <div>
        <label className="text-sm font-medium text-gray-700">New Password</label>
        <div className="relative">
          <input
            type={showPassword.new ? "text" : "password"}
            {...register("newPassword")}
            placeholder="Enter new password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <span
            className="absolute right-2 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => ({ ...prev, new: !prev.new }))}
          >
            {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
      </div>

      {/* Confirm New Password */}
      <div>
        <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
        <div className="relative">
          <input
            type={showPassword.confirm ? "text" : "password"}
            {...register("confirmNewPassword")}
            placeholder="Confirm new password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <span
            className="absolute right-2 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))}
          >
            {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        {errors.confirmNewPassword && <p className="text-red-500 text-sm">{errors.confirmNewPassword.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md">
        Change Password
      </button>
    </form>
  );
}

export default ChangePwBox;
