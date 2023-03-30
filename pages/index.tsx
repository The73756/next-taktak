import axios from 'axios';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { ReactElement, useEffect } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { IVideo } from '@/types/video';
import { BASE_URL } from '@/utils';
import { Layout } from '@/components/Layout';
import { VideoList } from '@/modules/VideoList';
import useVideoStore from '@/store/videoStore';

interface IHomeProps {
  videos: IVideo[];
}

const Home: NextPageWithLayout<IHomeProps> = ({ videos }) => {
  const { setVideos } = useVideoStore();

  useEffect(() => {
    setVideos(videos);
  }, []);

  return (
    <>
      <Head>
        <title>Tak-Tak</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full">
        <VideoList />
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
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
