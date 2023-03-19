import { IVideo } from '@/types/video';

export interface IUser {
  _id: string;
  userName: string;
  givenName?: string;
  familyName?: string;
  image: string;
}

// Костыль потому что нельзя получить пользователей чьи видео были лайкнуты

export interface ISuggestedUser {
  postedBy: IUser;
}

export interface IUserDetail {
  user: IUser;
  userLikes: IVideo[];
  userVideos: IVideo[];
}
