import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { GoVerified } from 'react-icons/go';
import { BASE_URL } from '@/utils';
import { IVideo } from '@/types/video';
import authStore from '@/store/authStore';
import LikeButton from '@/components/LikeButton';
import Comments from '@/components/Comments';
import { Layout } from '@/components/Layout';

interface IDetailProps {
  detail: IVideo;
}

const Detail: NextPageWithLayout<IDetailProps> = ({ detail }) => {
  const [video, setVideo] = useState(detail);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const { userProfile } = authStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const handleVideoClick = () => {
    if (!videoRef.current) return;

    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      void videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const handleLike = async (like: boolean) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile?._id,
        postId: video._id,
        like,
      });

      setVideo({ ...video, likes: data.likes });
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (comment: string) => {
    const { data } = await axios.put(`${BASE_URL}/api/post/${video._id}`, {
      userProfile,
      comment,
    });

    setVideo({ ...video, comments: [...(video.comments || []), data] });
  };

  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [video, isVideoMuted]);

  if (!video) return null;

  return (
    <div className="absolute left-0 top-0 flex h-full w-full flex-wrap bg-white lg:flex-nowrap">
      <div className="flex-2 relative flex w-[1000px] items-center justify-center bg-black lg:w-9/12">
        <div className="absolute top-6 left-2 z-50 flex gap-6 opacity-90 lg:left-6">
          <button
            onClick={() => router.back()}
            className="transition-opacity duration-300 hover:opacity-70">
            <MdOutlineCancel className="color-red-900 text-[35px] text-white" />
          </button>
        </div>
        <div className="relative">
          <div className="h-[60vh] lg:h-[100vh]">
            <video
              onClick={handleVideoClick}
              src={detail?.video.asset.url}
              ref={videoRef}
              loop
              className="h-full cursor-pointer"
            />
          </div>
          <div className="absolute top-[45%] left-[45%]  cursor-pointer">
            {!isVideoPlaying && (
              <button onClick={handleVideoClick}>
                <BsFillPlayFill className="text-6xl text-white lg:text-8xl" />
              </button>
            )}
          </div>
        </div>

        <div className="absolute  bottom-5 right-5 cursor-pointer lg:bottom-10  lg:right-10">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className="text-3xl text-white lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className="text-3xl text-white lg:text-4xl" />
            </button>
          )}
        </div>
      </div>
      <div className="relative flex w-[1000px] flex-col md:w-[900px] lg:w-[700px]">
        <div className="mt-10">
          <Link href={`/profile/${video.postedBy._id}`}>
            <div className="mb-4 flex w-full cursor-pointer gap-4 bg-white pl-10">
              <Image
                width={60}
                height={60}
                alt="user-profile"
                className="rounded-full"
                src={video.postedBy.image}
              />
              <div>
                <div className="flex items-center justify-center gap-2 text-xl font-bold tracking-wider">
                  <h3>{video.postedBy.userName} </h3>
                  <GoVerified className="text-xl text-blue-400" />
                </div>
                <h4>{`${video.postedBy.givenName || ''} ${video.postedBy.familyName || ''}`}</h4>
              </div>
            </div>
          </Link>
          <div className="mb-3 px-10">
            <h2 className="text-gray-600">{video.caption}</h2>
          </div>
          <div className="mb-3 px-10">
            {userProfile && (
              <LikeButton likes={video.likes || []} flex="flex" handleClick={handleLike} />
            )}
          </div>
        </div>
        <Comments addComment={addComment} comments={video.comments || []} />
      </div>
    </div>
  );
};

Detail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data } = await axios.get<IVideo>(`${BASE_URL}/api/post/${context.query.id}`);

  return {
    props: {
      detail: data,
    },
  };
}

export default Detail;
