import { VideoCard } from '@/components/video-card'
import { IVideo } from '@/types/video'
import { NoResults } from '@/ui/no-results'

interface ISearchVideoListProps {
  videos: IVideo[]
  searchTerm: string
}

export const SearchVideoList = ({ videos, searchTerm }: ISearchVideoListProps) => {
  return (
    <div className="flex flex-wrap gap-6 md:mt-16 md:justify-start ">
      {videos.length > 0 ? (
        videos.map((post) => <VideoCard key={post._id} post={post} />)
      ) : (
        <NoResults text={`No Video Results for "${searchTerm}"`} type="video" />
      )}
    </div>
  )
}
