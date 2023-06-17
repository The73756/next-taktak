import { useState } from 'react'
import { TabSwitcher } from '@/components/tab-switcher'
import { SearchUserList, SearchVideoList } from '@/modules/search'
import { IUser } from '@/types/user'
import { IVideo } from '@/types/video'

interface ISearchModuleProps {
  videos: IVideo[]
  users: IUser[]
  searchTerm: string
}

export const SearchModule = ({ users, videos, searchTerm }: ISearchModuleProps) => {
  const tabs = [
    {
      label: 'Videos',
      component: <SearchVideoList videos={videos} searchTerm={searchTerm} />,
    },
    {
      label: 'Users',
      component: <SearchUserList users={users} searchTerm={searchTerm} />,
    },
  ]

  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <>
      <div className="flex w-full  border-b-2 border-gray-200 bg-white p-2">
        <TabSwitcher activeEl={activeTab} setActiveEl={setActiveTab} elements={tabs} />
      </div>
      {activeTab.component}
    </>
  )
}
