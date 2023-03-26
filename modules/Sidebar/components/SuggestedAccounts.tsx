import { useEffect } from 'react';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import Image from 'next/image';
import useAuthStore from '@/store/authStore';

export const SuggestedAccounts = () => {
  const { suggestedUsers, fetchSuggestedUser, userProfile } = useAuthStore();

  useEffect(() => {
    if (userProfile) {
      void fetchSuggestedUser(userProfile._id);
    }
  }, []);

  if (!userProfile) return <h2>Вы еще не вошли в аккаунт</h2>;

  if (!suggestedUsers.length) return <h2>Нет рекомендуемых пользователей</h2>;

  return (
    <div className="border-gray-200 pb-4 xl:border-b-2">
      <p className="m-3 mt-4 hidden font-semibold text-gray-500 xl:block">Suggested accounts</p>
      <div>
        {suggestedUsers.map((postedBy) => (
          <Link href={`/profile/${postedBy._id}`} key={postedBy._id}>
            <div className="flex cursor-pointer items-center gap-3 rounded-md rounded p-2 font-semibold transition-colors duration-300 hover:bg-primary">
              <div className="h-8 w-8">
                <Image
                  width={34}
                  height={34}
                  className="rounded-full"
                  src={postedBy.image}
                  alt={`${postedBy.userName} profile image`}
                />
              </div>
              <div className="hidden xl:block">
                <h3 className="flex items-center gap-1 font-bold text-primary">
                  <span>{postedBy.userName}</span> <GoVerified className="text-xl text-blue-400" />
                </h3>
                <h4 className="text-xs capitalize text-gray-400">
                  {`${postedBy.givenName || ''} ${postedBy.familyName || ''}`}
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
