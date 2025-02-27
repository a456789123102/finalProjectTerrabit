import { useState } from "react";
import { useTheme } from "@/app/context/themeContext";
import useFetchUsers from "../../hooks/users/useFetchUser";
import { json } from "stream/consumers";
import { Mail, Settings } from "lucide-react";

function NewUserBox() {
  const { themeColors } = useTheme();
  const [pagination, setPagination] = useState({
    pageSize: 5,
  })
  const { users, loading, error } = useFetchUsers({
    pagination,
  });

  console.log("users: " + users);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="border border-gray-300  " style={{ backgroundColor: themeColors.base }}>
      <div className="p-3 border-b border-gray-300 font-medium text-[1.3rem]">NEW USERS</div>
      <div className="m-4 mt-5 flex flex-col gap-2">
        {users && users.map((user) => (
          <div className="border p-3 border-gray-300 rounded-[4px] flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="flex flex-row gap-2 items-center">
                <div className="flex flex-row gap-1 text-[0.8rem]">
                  <div>User ID:</div>
                  <div>#{user.id}</div>
                </div>
                <div>{user.username}</div>
              </div>
              <div className="text-gray-500 text-[0.65rem]">{new Date(user.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
              </div>
            </div>
            <div className="flex flex-row gap-2 text-gray-500">
              <Mail className="hover:text-yellow-600 cursor-pointer" size={20} />
              <Settings className="hover:text-purple-400 cursor-pointer" size={20}/>
            </div>
          </div>))}
      </div>
    </div>
  );
}

export default NewUserBox;
