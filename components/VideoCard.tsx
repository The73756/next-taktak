import { FC } from 'react';
import { IVideo } from '@/types/video';

interface IVideoCardProps {
  post: IVideo;
}

const VideoCard: FC<IVideoCardProps> = ({ post }) => {
  return <div>VideoCard</div>;
};

export default VideoCard;
