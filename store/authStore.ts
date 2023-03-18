import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '@/types/user';
import axios from 'axios';

interface IAuthStore {
  users: IUser[];
  userProfile: IUser | null;
  addUser: (user: IUser) => void;
  removeUser: () => void;
}

const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      userProfile: null,
      users: [],
      addUser: (user: IUser) => set({ userProfile: user }),
      removeUser: () => set({ userProfile: null }),
      fetchAllUsers: async () => {
        const { data } = await axios.get<IUser[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
        set({ users: data });
      },
    }),
    {
      name: 'auth-store',
    },
  ),
);

export default useAuthStore;
