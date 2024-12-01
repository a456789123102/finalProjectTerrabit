import { create } from 'zustand';

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

export const useUserStore = create<UserStore>((set) => ({
    id: 0,
    username: '',
    isAdmin: false,
    setUser: (user) => set({
        id: user?.id || 0,
        username: user?.username || '',
        isAdmin: user?.isAdmin || false
    }),
    clearUser: () => set({ id: 0, username: '', isAdmin: false }),
}));
