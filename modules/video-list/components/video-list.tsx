import { VideoCard } from '@/components/video-card'
import { IVideo } from '@/types/video'
import { NoResults } from '@/ui/no-results'

interface IVideoListProps {
  videos: IVideo[]
}

export const VideoList = ({ videos }: IVideoListProps) => {
  return (
    <div className="videos mr-3 flex h-full flex-col gap-10 md:mr-0">
      {videos.length > 0 ? (
        videos.map((video) => <VideoCard key={video._id} post={video} />)
      ) : (
        <NoResults text="No videos" type="video" className="-mt-32" />
      )}
    </div>
  )
}
