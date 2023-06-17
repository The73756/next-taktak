import Link from 'next/link';
import { useState } from 'react';
import authStore from '@/store/auth-store';
import { IVideo } from '@/types/video';
import { UserInfo } from '@/ui/user-info';
import LikeButton from '@/modules/DetailModule/components/LikeButton';
import Comments from '@/modules/DetailModule/components/Comments';
import { updateLike } from '@/modules/DetailModule/http/updateLike';
import { createComment } from '@/modules/DetailModule/http/createComment';

interface IVideoInfoProps {
  post: IVideo;
}

export const DetailVideoInfo = ({ post }: IVideoInfoProps) => {
  const [video, setVideo] = useState(post);
  const { userProfile } = authStore();

  const addComment = async (comment: string) => {
    if (!userProfile) return;

    const { data } = await createComment({
      userProfile,
      postId: video._id,
      comment,
    });

    setVideo({ ...video, comments: [...(video.comments || []), data] });
  };

  const handleLike = async (like: boolean) => {
    if (!userProfile) return;

    const likes = await updateLike({
      userId: userProfile?._id,
      postId: video._id,
      like,
    });

    setVideo({ ...video, likes: likes });
  };

  return (
    <div className="relative flex w-[1000px] flex-col md:w-[900px] lg:w-[700px]">
      <div className="mt-10">
        <Link href={`/profile/${video.postedBy._id}`}>
          <div className="mb-4 flex w-full cursor-pointer gap-4 bg-white pl-10">
            <UserInfo user={video.postedBy} />
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
  );
};
