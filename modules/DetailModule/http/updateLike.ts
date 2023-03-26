import axios from 'axios';
import { BASE_URL } from '@/utils';
import { ILike, IVideo } from '@/types/video';

interface IUpdateLikeProps {
  userId: string;
  postId: string;
  like: boolean;
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
  });

  return data.likes;
};
