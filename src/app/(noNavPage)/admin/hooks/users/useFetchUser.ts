import { getAllUsers } from "@/app/apis/user";
import { user } from "@nextui-org/react";
import { useState, useEffect } from "react";

const useFetchUsers = (searchQuery,pagination, setPagination, forceFetch,sortBy) => {
const [users, setUsers] = useState([]);
const fetchUserList = async () => {
    try {
        const usersData = await getAllUsers(searchQuery,pagination.page,pagination.pageSize,sortBy);
        setUsers(usersData.users);
    } catch (error) {
        console.error("Error fetching Users",error);
    }
}

useEffect(() => {
    fetchUserList();
}, [searchQuery, pagination.page, pagination.pageSize, forceFetch, sortBy]);
return users;
}
export default useFetchUsers;