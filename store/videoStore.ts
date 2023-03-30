import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IVideo } from '@/types/video';

interface IAuthStore {
  videos: IVideo[] | [];
  setVideos: (videos: IVideo[]) => void;
  addVideos: (newVideos: IVideo[]) => void;
}

const useVideoStore = create<IAuthStore>()(
  persist(
    (set) => ({
      videos: [],
      setVideos: (videos: IVideo[]) => set({ videos }),
      addVideos: (newVideos) =>
        set(({ videos }) => ({
          videos: [...videos, ...newVideos],
        })),
    }),
    {
      name: 'video-store',
    },
  ),
);

export default useVideoStore;
