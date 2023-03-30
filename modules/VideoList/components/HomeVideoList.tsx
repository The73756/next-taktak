import useVideoStore from '@/store/videoStore';
import { VideoCard } from '@/components/VideoCard';
import axios from 'axios';
import { BASE_URL, VIDEO_LIMIT } from '@/utils/constants';

export const HomeVideoList = () => {
  const { videos, totalVideos, setVideos } = useVideoStore();
  let page = 1;
  const hasMore = page * VIDEO_LIMIT < totalVideos;

  const fetchMoreData = async () => {
    page += 1;
    const { data } = await axios.get(`${BASE_URL}/api/post?page=${page}&limit=${VIDEO_LIMIT}`);
    setVideos([...videos, ...data.videos]);
  };

  return (
    <>
      {videos.map((video) => (
        <VideoCard post={video} key={video._id} />
      ))}
    </>
  );
};
