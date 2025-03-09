import { getAllUsers } from "@/app/apis/user";
import { useState, useEffect, useCallback } from "react";

interface PaginationType {
  page: number;
  totalPages: number;
  pageSize: number;
  totalUsers: number;
}

interface FetchParams {
  search?: string;
  orderBy?: string | undefined;
  orderWith?: string;
  isActive?: boolean | null;
  pagination?: PaginationType;
  forceFetch?: boolean;
  setPagination?: React.Dispatch<React.SetStateAction<PaginationType>>;
}

const useFetchUsers = ({
  search,
  orderBy,
  orderWith,
  isActive,
  pagination,
  forceFetch,
  setPagination,
}: FetchParams) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserList = useCallback(async () => {
    setLoading(true);
    try {
      const usersData = await getAllUsers(
        search,
        orderBy,
        orderWith,
        isActive,
        pagination?.page?.toString(),
        pagination?.pageSize?.toString()
      );

      setUsers(usersData.users);
      console.log("user Data :", usersData.users); 

      if (setPagination) {
        setPagination(usersData.pagination);
      }

      setError(null);
    } catch (error) {
      console.error("Error fetching Users", error);
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  }, [search, orderBy, orderWith, isActive, pagination?.page,pagination?.pageSize]);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList,forceFetch]);

  return { users, loading, error };
};

export default useFetchUsers;
