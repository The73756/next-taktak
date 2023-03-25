import Head from 'next/head';
import { GetServerSidePropsContext, NextPage } from 'next';
import { IVideo } from '@/types/video';
import axios from 'axios';
import VideoCard from '@/components/VideoCard';
import NoResults from '@/components/NoResults';
import { BASE_URL } from '@/utils';

interface IHomeProps {
  videos: IVideo[];
}

const Home: NextPage<IHomeProps> = ({ videos }) => {
  return (
    <>
      <Head>
        <title>Tak-Tak</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full">
        <div className="videos flex h-full flex-col gap-10">
          {videos.length ? (
            videos.map((video) => <VideoCard post={video} key={video._id} />)
          ) : (
            <NoResults text={'No videos'} type="video" className="-mt-32" />
          )}
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { topic } = query;
  let videos: IVideo[];

  if (topic) {
    const { data } = await axios.get<IVideo[]>(`${BASE_URL}/api/discover/${topic}`);
    videos = data;
  } else {
    const { data } = await axios.get<IVideo[]>(`${BASE_URL}/api/post`);
    videos = data;
  }

  return {
    props: {
      videos,
    },
  };
}

export default Home;
