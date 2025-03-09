import { create } from 'zustand';

type CartState = {
  cartItemCount: number;
  setCartItemCount: (count: number) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cartItemCount: 0, 
  setCartItemCount: (count) => set({ cartItemCount: count }),
}));
