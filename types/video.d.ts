import { IUser } from '@/types/user';
import { IComment } from '@/types/comment';

interface IVideoAsset {
  _id: string;
  url: string;
}

export interface ILike {
  postedBy: Omit<IUser, '_type'>;
}

export interface IVideo {
  caption: string;
  _id: string;
  userId: string;
  video: IVideoAsset;
  postedBy: Omit<IUser, '_type'>;
  likes: ILike[];
  comments: IComment[];
}
