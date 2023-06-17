import axios from 'axios'
import { IComment } from '@/types/comment'
import { IUser } from '@/types/user'
import { BASE_URL } from '@/utils/constants'

interface ICreateComment {
  comment: string
  postId: string
  userProfile: IUser
}

export const createComment = async ({ comment, postId, userProfile }: ICreateComment) => {
  return axios.put<IComment>(`${BASE_URL}/api/post/${postId}`, {
    userProfile,
    comment,
  })
}
