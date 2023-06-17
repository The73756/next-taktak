import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IVideo } from '@/types/video'

interface IAuthStore {
  videos: IVideo[] | []
  totalVideos: number
  setVideos: (videos: IVideo[]) => void
  addVideos: (newVideos: IVideo[]) => void
  setTotalVideos: (total: number) => void
}

const useVideoStore = create<IAuthStore>()(
  persist(
    (set) => ({
      videos: [],
      totalVideos: 0,
      setVideos: (videos: IVideo[]) => set({ videos }),
      addVideos: (newVideos) =>
        set(({ videos }) => ({
          videos: [...videos, ...newVideos],
        })),
      setTotalVideos: (totalVideos) => set({ totalVideos }),
    }),
    {
      name: 'video-store',
    }
  )
)

export default useVideoStore
