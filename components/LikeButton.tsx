import { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { ILike } from '@/types/video';
import useAuthStore from '@/store/authStore';

interface ILikeButtonProps {
  likes: ILike[];
  flex: string;
  handleClick: (like: boolean) => void;
}

const LikeButton = ({ likes, flex, handleClick }: ILikeButtonProps) => {
  const [liked, setIsLiked] = useState(true);
  const { userProfile }: any = useAuthStore();
  let filterLikes = likes?.filter((item: any) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className={`${flex} gap-6`}>
      <div className="mt-4 flex cursor-pointer flex-col items-center justify-center">
        <button
          className={`rounded-full bg-primary p-2 ${liked ? 'text-accent' : 'text-black'} md:p-4`}
          onClick={() => handleClick(!liked)}>
          <MdFavorite className="text-lg md:text-2xl" />
        </button>

        <p className="text-md font-semibold ">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
