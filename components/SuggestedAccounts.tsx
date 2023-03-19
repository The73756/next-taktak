import { useEffect } from 'react';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import Image from 'next/image';
import useAuthStore from '@/store/authStore';

const SuggestedAccounts = () => {
  const { suggestedUsers, fetchSuggestedUser, userProfile } = useAuthStore();

  useEffect(() => {
    if (userProfile) {
      void fetchSuggestedUser(userProfile._id);
    }
  }, []);

  if (!userProfile) return <h2>Вы еще не вошли в аккаунт</h2>;

  if (!suggestedUsers) return <h2>Нет рекомендуемых пользователей</h2>;

  return (
    <div className="border-gray-200 pb-4 xl:border-b-2">
      <p className="m-3 mt-4 hidden font-semibold text-gray-500 xl:block">Suggested accounts</p>
      <div>
        {suggestedUsers?.slice(0, 6).map(({ postedBy }) => (
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
                <p className="text-md flex items-center gap-1 font-bold text-primary">
                  {postedBy.userName.trim()}
                  <GoVerified className="text-blue-400" />
                </p>
                <p className="text-xs capitalize text-gray-400">{postedBy.userName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
