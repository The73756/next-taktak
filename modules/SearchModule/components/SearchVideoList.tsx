import { VideoCard } from '@/components/VideoCard';
import { NoResults } from '@/ui/NoResults';
import { IVideo } from '@/types/video';

interface ISearchVideoListProps {
  videos: IVideo[];
  searchTerm: string;
}

export const SearchVideoList = ({ videos, searchTerm }: ISearchVideoListProps) => {
  return (
    <div className="flex flex-wrap gap-6 md:mt-16 md:justify-start ">
      {videos.length ? (
        videos.map((post, idx) => <VideoCard post={post} key={idx} />)
      ) : (
        <NoResults text={`No Video Results for "${searchTerm}"`} type="video" />
      )}
    </div>
  );
};
