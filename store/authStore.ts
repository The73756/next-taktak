import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '@/types/user';
import { BASE_URL } from '@/utils';

import axios from 'axios';

interface IAuthStore {
  userProfile: IUser | null;
  addUser: (user: IUser) => void;
  removeUser: () => void;
  suggestedUsers: IUser[];
  fetchSuggestedUser: (userId: string) => Promise<void>;
}

const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      userProfile: null,
      suggestedUsers: [],
      addUser: (user: IUser) => set({ userProfile: user }),
      removeUser: () => set({ userProfile: null }),
      fetchSuggestedUser: async (userId) => {
        const { data } = await axios.get<IUser[]>(`${BASE_URL}/api/users?id=${userId}`);
        set({ suggestedUsers: data });
      },
    }),
    {
      name: 'auth-store',
    },
  ),
);

export default useAuthStore;
