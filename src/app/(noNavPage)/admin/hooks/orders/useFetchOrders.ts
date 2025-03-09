import { useState, useEffect, useCallback } from "react";
import { fetchAllOrders } from "@/app/apis/order";

// ✅ เพิ่ม Type ที่ขาดหายไป
interface PaginationState {
  page: number;
  pageSize: number;
  totalPages: number;
  totalOrders: number;
}

interface Order {
  id: number;
  items: { productName: string }[];
  totalPrice: number;
  slipUrl?: string | null;
  createdAt: string;
  status: string;
}

export const useFetchOrders = (
  statuses: string[],
  forceFetch: boolean,
  searchQuery: string,
  pagination: PaginationState, 
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>, 
  orderBy: string,
  orderWith: string
) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrderLists = useCallback(async () => {
    try {
      const orderData = await fetchAllOrders(
        statuses,
        searchQuery,
        pagination.page.toString(),
        pagination.pageSize.toString(),
        orderBy,
        orderWith
      );

      setOrders(orderData.orders);

      setPagination((prev) => ({
        ...prev, // ✅ เก็บค่าเดิมไว้
        page: orderData.pagination.page,
        pageSize: orderData.pagination.pageSize,
        totalPages: orderData.pagination.totalPages ?? prev.totalPages, // ✅ ป้องกัน undefined
        totalOrders: orderData.pagination.totalOrders ?? prev.totalOrders, // ✅ ป้องกัน undefined
      }));
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  }, [statuses, searchQuery, pagination.page, pagination.pageSize, orderBy, orderWith]);

  useEffect(() => {
    fetchOrderLists();
  }, [fetchOrderLists, forceFetch]);

  return orders;
};
