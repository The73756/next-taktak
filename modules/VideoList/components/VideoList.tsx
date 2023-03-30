import { VideoCard } from '@/components/VideoCard';
import { NoResults } from '@/ui/NoResults';
import useVideoStore from '@/store/videoStore';

// Infinity scroll with Intersection Observer and React Query library and pagination by query params

export const VideoList = () => {
  const { videos } = useVideoStore();
  return (
    <div className="videos flex h-full flex-col gap-10">
      {videos.length ? (
        videos.map((video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text={'No videos'} type="video" className="-mt-32" />
      )}
    </div>
  );
};
