import { CredentialResponse } from '@react-oauth/google'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { IUser } from '@/types/user'
import { BASE_URL } from '@/utils/constants'

interface IDecodedUserResponse {
  name: string
  given_name: string
  family_name: string
  picture: string
  sub: string
}

export const createOrGetUser = async (
  response: CredentialResponse,
  addUser: (user: IUser) => void
) => {
  if (!response.credential) {
    throw new Error('No credential')
  }
  const decoded: IDecodedUserResponse = jwtDecode(response.credential)

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { name, picture, sub, given_name, family_name } = decoded

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    givenName: family_name || '',
    familyName: given_name || '',
    image: picture,
  }

  addUser(user)

  await axios.post(`${BASE_URL}/api/auth`, user)
}
