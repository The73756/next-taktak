import { useRouter } from 'next/router';
import { useState } from 'react';
import { SanityAssetDocument } from '@sanity/client';
import { topics } from '@/utils/topics';
import useAuthStore from '@/store/auth-store';
import { VideoInput } from './video-input';
import { VideoCaptionBlock } from './video-caption-block';
import { createVideo } from '../http/create-video';

export const VideoUploader = () => {
  const router = useRouter();
  const { userProfile } = useAuthStore();
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | null>(null);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState(topics[0].name);

  const handlePost = async () => {
    if (caption && category && videoAsset?._id && userProfile) {
      try {
        await createVideo({ caption, category, videoAsset, userProfile });
      } catch (e) {
        console.log(e);
      }

      // TODO: Add a success message + loader
      void router.push('/');
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Upload Video</h2>
        <p className="mt-1 text-gray-400">Post a video to your account</p>
        <VideoInput videoAsset={videoAsset} setVideoAsset={setVideoAsset} />
      </div>
      <VideoCaptionBlock
        caption={caption}
        setCaption={setCaption}
        category={category}
        setCategory={setCategory}
        handlePost={handlePost}
      />
    </>
  );
};
