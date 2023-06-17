import axios from 'axios'
import useVideoStore from '@/store/video-store'
import { BASE_URL, VIDEO_LIMIT } from '@/utils/constants'
import { VideoList } from './video-list'

export const HomeVideoList = () => {
  const { videos, totalVideos, setVideos } = useVideoStore()

  let page = 1
  const hasMore = page * VIDEO_LIMIT < totalVideos

  const fetchMoreData = async () => {
    page += 1
    const { data } = await axios.get(`${BASE_URL}/api/post?page=${page}&limit=${VIDEO_LIMIT}`)
    setVideos([...videos, ...data.videos])
  }

  return <VideoList videos={videos} />
}
