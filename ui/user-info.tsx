import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import { IUser } from '@/types/user'

interface IUserInfoProps {
  user: IUser
}

export const UserInfo = ({ user }: IUserInfoProps) => {
  return (
    <>
      <Image
        width={60}
        height={60}
        alt={`${user.userName} profile photo`}
        className="rounded-full"
        src={user.image}
      />
      <div>
        <div className="flex items-center justify-center gap-2 py-1 text-xl font-bold">
          <h3>{user.userName} </h3>
          <GoVerified className="text-xl text-blue-400" />
        </div>
        <h4>{`${user.givenName || ''} ${user.familyName || ''}`}</h4>
      </div>
    </>
  )
}
