import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { IUser } from '@/types/user'
import { NoResults } from '@/ui/no-results'

interface ISearchUserListProps {
  users: IUser[]
  searchTerm: string
}

export const SearchUserList = ({ users, searchTerm }: ISearchUserListProps) => {
  return (
    <div className="md:mt-16">
      {users.length > 0 ? (
        users.map((user: IUser) => (
          <Link key={user._id} href={`/profile/${user._id}`}>
            <div className=" flex cursor-pointer gap-3 rounded border-b-2 border-gray-200 p-2 font-semibold">
              <div>
                <Image
                  width={50}
                  height={50}
                  className="rounded-full"
                  alt="user-profile"
                  src={user.image}
                />
              </div>
              <div>
                <div>
                  <p className="flex items-center gap-1 text-lg font-bold text-primary">
                    {user.userName} <GoVerified className="text-blue-400" />
                  </p>
                  <p className="text-sm capitalize text-gray-400">{user.userName}</p>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <NoResults text={`No Account Results for "${searchTerm}"`} type="user" />
      )}
    </div>
  )
}
