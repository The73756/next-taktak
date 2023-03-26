import Link from 'next/link';
import Image from 'next/image';
import { IVideo } from '@/types/video';
import { GoVerified } from 'react-icons/go';
import { VideoPlayer } from '@/modules/VideoList/components/VideoPlayer';

interface IVideoCardProps {
  post: IVideo;
}

export const VideoCard = ({ post }: IVideoCardProps) => {
  const { postedBy, video } = post;

  return (
    <article className="flex flex-col border-b-2 border-gray-200 pb-6">
      <Link href={`/profile/${postedBy._id}`} className="flex gap-3 rounded p-2 font-semibold">
        <div className="h-10 w-10 md:w-16">
          <Image
            src={postedBy.image}
            alt={`${postedBy.userName} profile photo`}
            width={62}
            height={62}
            className="rounded-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-primary">{postedBy.userName}</h3>
          <GoVerified className="text-lg text-blue-400" />
        </div>
      </Link>
      <VideoPlayer videoUrl={video.asset.url} postId={post._id} />
    </article>
  );
};
