import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IVideo } from '@/types/video'

interface IAuthStore {
  videos: IVideo[] | []
  setVideos: (videos: IVideo[]) => void
}

const useVideoStore = create<IAuthStore>()(
  persist(
    (set) => ({
      videos: [],
      setVideos: (videos) => set({ videos }),
    }),
    {
      name: 'video-store',
    }
  )
)

export default useVideoStore
