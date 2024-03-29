import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { ReactElement, useState } from 'react'
import { Layout } from '@/components/layout'
import { TabSwitcher } from '@/components/tab-switcher'
import { VideoList } from '@/modules/video-list'
import { NextPageWithLayout } from '@/pages/_app'
import { IUserDetail } from '@/types/user'
import { UserInfo } from '@/ui/user-info'
import { BASE_URL } from '@/utils/constants'

interface IProfileProps {
  detail: IUserDetail
}

const Profile: NextPageWithLayout<IProfileProps> = ({ detail }) => {
  const { user, userLikes, userVideos } = detail

  const tabs = [
    {
      label: 'Videos',
      component: <VideoList videos={userVideos} />,
    },
    {
      label: 'Liked',
      component: <VideoList videos={userLikes} />,
    },
  ]

  const [activeTab, setActiveTab] = useState(tabs[0])

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
  )
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data } = await axios.get<IUserDetail>(`${BASE_URL}/api/profile/${context.query.id}`)

  return {
    props: {
      detail: data,
    },
  }
}

export default Profile
