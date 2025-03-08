"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { changeUsername, logout } from "@/app/apis/auth";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/zustand";

// ✅ Schema validation ด้วย zod
const schema = z.object({
  oldPassword: z.string().min(1, "Required"),
  newUsername: z.string().min(6, "Username must be at least 6 characters"),
});

function ChangeUsernameBox() {
  const router = useRouter();
  const { clearUser } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await changeUsername(data.oldPassword, data.newUsername);
      Swal.fire({
        icon: "success",
        title: "Username Changed",
        text: "Your username has been updated successfully!",
      });

      await logout();
      clearUser();
      router.push("/login"); // ให้กลับไปหน้า Login
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Change Username",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 mt-4 p-4 border rounded-md shadow-md"
    >
      <div>
        <label className="text-sm font-medium text-gray-700">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("oldPassword")}
            placeholder="Enter your current password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <span
            className="absolute right-2 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        {errors.oldPassword && (
          <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>
        )}
      </div>

      {/* New Username */}
      <div>
        <label className="text-sm font-medium text-gray-700">New Username</label>
        <input
          type="text"
          {...register("newUsername")}
          placeholder="Enter new username"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.newUsername && (
          <p className="text-red-500 text-sm">{errors.newUsername.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
      >
        Change Username
      </button>
    </form>
  );
}

export default ChangeUsernameBox;
