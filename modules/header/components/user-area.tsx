import { GoogleLogin, googleLogout } from '@react-oauth/google'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineLogout } from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'
import useAuthStore from '@/store/auth-store'
import { Routes } from '@/utils/constants'
import { createOrGetUser } from '@/utils/user-auth'

export const UserArea = () => {
  const { userProfile, addUser, removeUser } = useAuthStore()

  if (!userProfile) {
    return (
      <GoogleLogin
        onSuccess={(response) => {
          void createOrGetUser(response, addUser)
        }}
        useOneTap
        auto_select
      />
    )
  }

  return (
    <div className="flex gap-5 md:gap-10">
      <Link
        href={Routes.UPLOAD}
        className="flex items-center gap-2 border-2 px-2 font-semibold md:px-4"
      >
        <IoMdAdd className="text-xl" /> <span className="hidden md:block">Upload</span>
      </Link>
      {userProfile.image && (
        <Link href={`${Routes.PROFILE}/${userProfile._id}`}>
          <Image
            src={userProfile.image}
            alt="Your profile image"
            width={36}
            height={36}
            className="cursor-pointer rounded-full"
          />
        </Link>
      )}
      <button
        type="button"
        className="px-2"
        onClick={() => {
          googleLogout()
          removeUser()
        }}
      >
        <AiOutlineLogout className="text-[21px] text-red-600 hover:text-red-900" />
      </button>
    </div>
  )
}
