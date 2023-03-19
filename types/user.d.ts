export interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

// Костыль потому что нельзя получить пользователей чьи видео были лайкнуты

export interface ISuggestedUser {
  postedBy: IUser;
}
