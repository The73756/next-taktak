import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { Layout } from '@/components/layout'
import { SearchModule } from '@/modules/search'
import { NextPageWithLayout } from '@/pages/_app'
import { IUser } from '@/types/user'
import { IVideo } from '@/types/video'
import { BASE_URL } from '@/utils/constants'

interface ISearchProps {
  videos: IVideo[]
  users: IUser[]
}

const Search: NextPageWithLayout<ISearchProps> = ({ videos, users }) => {
  const router = useRouter()
  const { searchTerm } = router.query

  return (
    <div className="w-full">
      <SearchModule searchTerm={String(searchTerm)} videos={videos} users={users} />
    </div>
  )
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

// TODO: Уйти от gssp, фетчить данные на клиенте из search (UserList, SearchVideoList)

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data } = await axios.get<ISearchProps>(
    `${BASE_URL}/api/search/${context.query.searchTerm}`
  )
  return {
    props: {
      videos: data.videos,
      users: data.users,
    },
  }
}

export default Search
