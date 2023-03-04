import VideoUploader from '@/components/VideoUploader';

const Upload = () => {
  return (
    <div className="flex h-full w-full ">
      <div className="rounded-lg bg-white">
        <div>
          <p className="text-2xl font-bold">Upload Video</p>
          <p className="mt-1 text-gray-400">Post a video to your account</p>
        </div>
        <VideoUploader />
      </div>
    </div>
  );
};

export default Upload;
