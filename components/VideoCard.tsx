import { IVideo } from '@/types/video';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface IVideoCardProps {
  post: IVideo;
}

const VideoCard = ({ post }: IVideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      void videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <article className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div className="flex gap-3 rounded p-2 font-semibold">
        <Link href="/" className="md-16 h-10 w-10 md:w-16">
          <Image
            src={post.postedBy.image}
            alt={`${post.postedBy.userName} profile photo`}
            width={62}
            height={62}
            className="rounded-full"
          />
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <h3 className="font-bold text-primary">{post.postedBy.userName}</h3>
          <GoVerified className="text-lg text-blue-400" />
        </Link>
      </div>
      <div className="group relative gap-4 lg:ml-20">
        <Link href="/" className="rounded-3xl">
          <video
            loop
            ref={videoRef}
            muted={isVideoMuted}
            src={post.video.asset.url}
            className="h-[300px] w-[200px] rounded-3xl bg-gray-100 md:h-[400px] lg:h-[530px] lg:w-[600px]"
          />
        </Link>
        <div className="absolute bottom-6 left-8 flex w-full max-w-[600px] gap-10 p-3 md:left-14 lg:left-0 lg:justify-between">
          <button className="videoControlBtn" onClick={handleVideoClick}>
            {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
          </button>

          <button
            className="videoControlBtn"
            onClick={() => setIsVideoMuted((prevState) => !prevState)}>
            {isVideoMuted ? <HiVolumeOff /> : <HiVolumeUp />}
          </button>
        </div>
      </div>
    </article>
  );
};

export default VideoCard;
