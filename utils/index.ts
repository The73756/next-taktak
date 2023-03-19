import jwtDecode from 'jwt-decode';
import { CredentialResponse } from '@react-oauth/google';
import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface IDecodedUserResponse {
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  sub: string;
}

export const createOrGetUser = async (response: CredentialResponse, addUser: any) => {
  if (!response.credential) {
    throw new Error('No credential');
  }
  const decoded: IDecodedUserResponse = jwtDecode(response.credential);
  console.log(decoded);
  const { name, picture, sub, given_name, family_name } = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    givenName: family_name || '',
    familyName: given_name || '',
    image: picture,
  };

  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};
