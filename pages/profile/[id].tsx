import { GetServerSidePropsContext, NextPage } from 'next';
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { GoVerified } from 'react-icons/go';
import { IUserDetail } from '@/types/user';
import { BASE_URL } from '@/utils';
import NoResults from '@/components/NoResults';
import VideoCard from '@/components/VideoCard';

interface IProfileProps {
  detail: IUserDetail;
}

/* TODO: переписать на норм компоненты, потом */

const Profile: NextPage<IProfileProps> = ({ detail }) => {
  const { user, userLikes, userVideos } = detail;
  const [showVideos, setShowVideos] = useState(true);

  return (
    <div className="w-full">
      <div className="mb-4 flex w-full gap-6 bg-white ">
        <div className="h-16 w-16 md:h-20 md:w-20">
          <Image
            width={120}
            height={120}
            className="rounded-full"
            src={user.image}
            alt={`${user.userName} profile photo`}
          />
        </div>

        <div>
          <div className="text-md flex items-center justify-center gap-2 font-bold tracking-wider md:text-2xl">
            <h2>{user.userName}</h2>
            <GoVerified className="text-md text-blue-400 md:text-xl" />
          </div>
          <h3 className="text-sm font-medium">
            {`${user.givenName || ''} ${user.familyName || ''}`}
          </h3>
        </div>
      </div>
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
          Liked
        </button>
      </div>
      <div className="flex flex-wrap gap-6 md:justify-start">
        {showVideos ? (
          userVideos.length > 0 ? (
            userVideos.map((post) => <VideoCard key={post._id} post={post} />)
          ) : (
            <NoResults text={`No Videos Yet`} type="video" />
          )
        ) : userLikes.length > 0 ? (
          userLikes.map((post) => <VideoCard key={post._id} post={post} />)
        ) : (
          <NoResults text={`No Likes Yet`} type="video" />
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data } = await axios.get<IUserDetail>(`${BASE_URL}/api/profile/${context.query.id}`);

  return {
    props: {
      detail: data,
    },
  };
}

export default Profile;
