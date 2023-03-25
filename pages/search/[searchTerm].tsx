import axios from 'axios';
import { BASE_URL } from '@/utils';
import { GetServerSidePropsContext } from 'next';
import { NextPageWithLayout } from '@/pages/_app';
import { IUser } from '@/types/user';
import { IVideo } from '@/types/video';
import { ReactElement, useState } from 'react';
import Image from 'next/image';
import NoResults from '@/components/NoResults';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import VideoCard from '@/components/VideoCard';
import Link from 'next/link';
import { Layout } from '@/components/Layout';

interface ISearchProps {
  videos: IVideo[] | [];
  users: IUser[] | [];
}

const Search: NextPageWithLayout<ISearchProps> = ({ videos, users }) => {
  const router = useRouter();
  const { searchTerm } = router.query;
  const [showVideos, setShowVideos] = useState(true);

  return (
    <div className="w-full">
      <div className="mb-6 flex w-full gap-10 border-b-2 border-gray-200 bg-white p-2">
        <button
          className={`cursor-pointer text-xl font-semibold 
          ${showVideos ? 'activeTab' : ''} mt-2 transition-colors duration-300`}
          onClick={() => setShowVideos(true)}>
          Videos
        </button>
        <button
          className={`cursor-pointer text-xl font-semibold 
          ${!showVideos ? 'activeTab' : ''} mt-2 transition-colors duration-300`}
          onClick={() => setShowVideos(false)}>
          Users
        </button>
      </div>
      {showVideos ? (
        <div className="flex flex-wrap gap-6 md:mt-16 md:justify-start ">
          {videos.length ? (
            videos.map((post, idx) => <VideoCard post={post} key={idx} />)
          ) : (
            <NoResults text={`No Video Results for "${searchTerm}"`} type="video" />
          )}
        </div>
      ) : (
        <div className="md:mt-16">
          {users.length > 0 ? (
            users.map((user: IUser, idx: number) => (
              <Link key={idx} href={`/profile/${user._id}`}>
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
            <NoResults text={`No Account Results for "${searchTerm}"`} type="video" />
          )}
        </div>
      )}
    </div>
  );
};

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data } = await axios.get<ISearchProps>(
    `${BASE_URL}/api/search/${context.query.searchTerm}`,
  );
  return {
    props: {
      videos: data.videos,
      users: data.users,
    },
  };
}

export default Search;
