import React from "react";
import { useTheme } from "@/app/context/themeContext";
import useFetchUsers from "../../hooks/users/useFetchUser";

function NewUserBox() {
  const { themeColors } = useTheme();
  const { users, loading, error } = useFetchUsers({}); // ✅ ไม่ต้องส่งพารามิเตอร์
if (loading) {
    return <p>Loading...</p>;
}
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="border border-gray-300" style={{ backgroundColor: themeColors.base }}>
      <div className="p-3 border-b border-gray-300 font-medium text-[1.3rem]">NEW USERS</div>
      <div className="m-4 mt-5 border border-gray-300">
        {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <p>{users.length} Users Found</p>}
      </div>
    </div>
  );
}

export default NewUserBox;
