import axios from 'axios';
import { BASE_URL } from '@/utils';
import { IUser } from '@/types/user';
import { IComment } from '@/types/comment';

interface ICreateComment {
  comment: string;
  postId: string;
  userProfile: IUser;
}

export const createComment = async ({ comment, postId, userProfile }: ICreateComment) => {
  return await axios.put<IComment>(`${BASE_URL}/api/post/${postId}`, {
    userProfile,
    comment,
  });
};
