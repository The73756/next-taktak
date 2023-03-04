import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '@/types/user';

interface IAuthStore {
  userProfile: IUser | null;
  addUser: (user: IUser) => void;
  removeUser: () => void;
}

const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      userProfile: null,
      addUser: (user: IUser) => set({ userProfile: user }),
      removeUser: () => set({ userProfile: null }),
    }),
    {
      name: 'auth-store',
    },
  ),
);

export default useAuthStore;
