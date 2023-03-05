import { useState } from 'react';
import useAuthStore from '@/store/authStore';
import { SanityAssetDocument } from '@sanity/client';
import axios from 'axios';
import { router } from 'next/client';
import VideoUploader from '@/components/VideoUploader';
import VideoCaptionBlock from '@/components/VideoCaptionBlock';
import { topics } from '@/utils/constants';

const Upload = () => {
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | null>(null);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState(topics[0].name);

  const { userProfile } = useAuthStore();

  const handlePost = async () => {
    if (caption && category && videoAsset?._id) {
      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic: category,
      };

      try {
        await axios.post('http://localhost:3000/api/post', document);
      } catch (e) {
        console.log(e);
      }

      void router.push('/');
    }
  };

  return (
    <div className="absolute left-0 top-[55px] mb-10 flex h-full w-full justify-center bg-gray-100 pt-10 lg:pt-20">
      <div className="flex flex-wrap items-center justify-center gap-20 rounded-lg bg-white p-14 pt-6 xl:h-[80vh]">
        <div>
          <h2 className="text-2xl font-bold">Upload Video</h2>
          <p className="mt-1 text-gray-400">Post a video to your account</p>
          <VideoUploader videoAsset={videoAsset} setVideoAsset={setVideoAsset} />
        </div>
        <VideoCaptionBlock
          caption={caption}
          setCaption={setCaption}
          category={category}
          setCategory={setCategory}
          handlePost={handlePost}
        />
      </div>
    </div>
  );
};

export default Upload;
