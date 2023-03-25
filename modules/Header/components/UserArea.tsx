import Link from 'next/link';
import Image from 'next/image';
import useAuthStore from '@/store/authStore';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineLogout } from 'react-icons/ai';
import { createOrGetUser } from '@/utils';

export const UserArea = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  if (!userProfile) {
    return (
      <GoogleLogin
        onSuccess={(response) => {
          void createOrGetUser(response, addUser);
        }}
      />
    );
  }

  return (
    <div className="flex gap-5 md:gap-10">
      <Link
        href={'/upload'}
        className="flex items-center gap-2 border-2 px-2 font-semibold md:px-4">
        <IoMdAdd className="text-xl" /> <span className="hidden md:block">Upload</span>
      </Link>
      {userProfile.image && (
        <Link href="/">
          <Image
            src={userProfile.image}
            alt={'Your profile image'}
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
          googleLogout();
          removeUser();
        }}>
        <AiOutlineLogout className="text-[21px] text-red-600 hover:text-red-900" />
      </button>
    </div>
  );
};
