import { GetServerSidePropsContext } from 'next';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { GoVerified } from 'react-icons/go';
import { IUserDetail } from '@/types/user';
import { BASE_URL } from '@/utils';
import { Layout } from '@/components/Layout';
import { VideoList } from '@/modules/VideoList';
import { TabSwitcher } from '@/components/TabSwitcher';

interface IProfileProps {
  detail: IUserDetail;
}

const Profile: NextPageWithLayout<IProfileProps> = ({ detail }) => {
  const { user, userLikes, userVideos } = detail;

  const tabs = [
    {
      label: 'Videos',
      component: <VideoList videos={userVideos} />,
    },
    {
      label: 'Liked',
      component: <VideoList videos={userLikes} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

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
        <TabSwitcher activeEl={activeTab} setActiveEl={setActiveTab} elements={tabs} />
      </div>
      <div className="flex flex-wrap gap-6 md:justify-start">{activeTab.component}</div>
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
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
