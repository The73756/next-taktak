import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { ReactElement } from 'react'
import { Layout } from '@/components/layout'
import { DetailVideoInfo, DetailVideoPlayer } from '@/modules/detail'
import { NextPageWithLayout } from '@/pages/_app'
import { IVideo } from '@/types/video'
import { BASE_URL } from '@/utils/constants'

interface IDetailProps {
  detail: IVideo
}

const Detail: NextPageWithLayout<IDetailProps> = ({ detail }) => {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full flex-wrap bg-white lg:flex-nowrap">
      <DetailVideoPlayer videoUrl={detail.video.asset.url} />
      <DetailVideoInfo post={detail} />
    </div>
  )
}

Detail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data } = await axios.get<IVideo>(`${BASE_URL}/api/post/${context.query.id}`)

  return {
    props: {
      detail: data,
    },
  }
}

export default Detail
