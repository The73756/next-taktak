import { IUser } from '@/types/user';
import { IComment } from '@/types/comment';

interface IVideoAsset {
  asset: {
    _id: string;
    url: string;
  };
}

export interface ILike {
  _ref: string;
  postedBy: IUser;
}

export interface IVideo {
  caption: string;
  _id: string;
  userId: string;
  video: IVideoAsset;
  postedBy: IUser;
  likes: ILike[] | null;
  comments: IComment[] | null;
}
