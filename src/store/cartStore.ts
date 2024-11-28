import { create } from 'zustand';

const useCartStore = create((set) => ({
  cartItemCount: 0, // จำนวนสินค้าในตะกร้า
  setCartItemCount: (count: number) => set({ cartItemCount: count }), // ฟังก์ชันสำหรับอัพเดทจำนวนสินค้า
}));

export default useCartStore;
