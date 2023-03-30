import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement, useState } from 'react';
import { IUserDetail } from '@/types/user';
import { BASE_URL } from '@/utils/constants';
import { Layout } from '@/components/Layout';
import { VideoList } from '@/modules/VideoList';
import { TabSwitcher } from '@/components/TabSwitcher';
import { UserInfo } from '@/ui/UserInfo';

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
        <UserInfo user={user} />
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
