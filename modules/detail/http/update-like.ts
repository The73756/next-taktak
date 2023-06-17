import axios from 'axios'
import { ILike, IVideo } from '@/types/video'
import { BASE_URL } from '@/utils/constants'

interface IUpdateLikeProps {
  userId: string
  postId: string
  like: boolean
}

export const updateLike = async ({
  userId,
  postId,
  like,
}: IUpdateLikeProps): Promise<ILike[] | null> => {
  const { data } = await axios.put<IVideo>(`${BASE_URL}/api/like`, {
    userId,
    postId,
    like,
  })

  return data.likes
}
