import jwtDecode from 'jwt-decode';
import { CredentialResponse } from '@react-oauth/google';
import axios from 'axios';
import { IUser } from '@/types/user';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface IDecodedUserResponse {
  name: string;
  picture: string;
  sub: string;
}

export const createOrGetUser = async (response: CredentialResponse, addUser: any) => {
  if (!response.credential) {
    throw new Error('No credential');
  }
  const decoded: IDecodedUserResponse = jwtDecode(response.credential);
  const { name, picture, sub } = decoded;

  const user: IUser = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };

  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};
