import { IVideo } from '@/types/video';

export interface IUser {
  _id: string;
  userName: string;
  givenName?: string;
  familyName?: string;
  image: string;
}

export interface IUserDetail {
  user: IUser;
  userLikes: IVideo[];
  userVideos: IVideo[];
}
