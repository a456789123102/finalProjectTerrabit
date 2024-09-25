import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
    id: number;
    username: string;
};

type UserStore = {
    id: number;
    username: string;
    setUser: (user: UserState) => void;
    clearUser: () => void;
};

export const useUserStore = create(
    persist<UserStore>(
        (set, get) => ({
            id: 0,
            username: '',
            setUser: (user) => set(user),
            clearUser: () => set({id: 0, username: ''}),
        }),{
            name: 'user-state',
        }
    )
);
