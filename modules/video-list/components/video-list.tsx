import { VideoCard } from '@/components/video-card';
import { NoResults } from '@/ui/no-results';
import { IVideo } from '@/types/video';

interface IVideoListProps {
  videos: IVideo[];
}

export const VideoList = ({ videos }: IVideoListProps) => {
  return (
    <div className="videos flex h-full flex-col gap-10">
      {videos && videos.length ? (
        videos.map((video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text={'No videos'} type="video" className="-mt-32" />
      )}
    </div>
  );
};
