import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
    id: number;
    username: string;
    isAdmin: boolean;
};

type UserStore = {
    id: number;
    username: string;
    isAdmin: boolean;
    setUser: (user: UserState) => void;
    clearUser: () => void;
};

export const useUserStore = create(
    persist<UserStore>(
      (set) => ({
        id: 0,
        username: '',
        isAdmin: false,
        setUser: (user) => set({
          id: user?.id || 0,
          username: user?.username || '',
          isAdmin: user?.isAdmin || false
        }),
        clearUser: () => set({ id: 0, username: '', isAdmin: false }),
      }), {
        name: 'user-state',
      }
    )
  );
  
 