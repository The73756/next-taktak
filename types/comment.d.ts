import { IUser } from '@/types/user';

export interface IComment {
  comment: string;
  _key: string;
  postedBy: Omit<IUser, '_type'>;
}
