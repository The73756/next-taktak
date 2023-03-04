import { FaCloudUploadAlt } from 'react-icons/fa';
import { ChangeEvent, useState } from 'react';
import { client } from '@/utils/client';
import { SanityAssetDocument } from '@sanity/client';

const VideoUploader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [wrongFileType, setWrongFileType] = useState(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | null>(null);
  const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFile = e.target.files[0];

    if (!fileTypes.includes(selectedFile.type)) {
      setIsLoading(false);
      setWrongFileType(true);
      return;
    }

    try {
      setIsLoading(true);
      const data = await client.assets.upload('file', selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name,
      });
      setVideoAsset(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hover: mt-10 flex h-[460px] w-[260px] cursor-pointer flex-col items-center justify-center rounded-xl border-4 border-dashed border-gray-200 bg-gray-100 p-10 transition-colors duration-300 hover:border-red-300">
      {isLoading ? (
        <p>Uploading...</p>
      ) : (
        <div>
          {videoAsset ? (
            <div>
              <video
                src={videoAsset.url}
                loop
                controls
                className="mt-16 h-[450px] rounded-xl bg-black "></video>
            </div>
          ) : (
            <label className="cursor-pointer ">
              <div className=" flex h-full flex-col items-center justify-center">
                <div className=" flex flex-col items-center justify-center">
                  <FaCloudUploadAlt className="text-6xl text-gray-300" />
                  <p className="text-xl font-semibold">Upload video</p>
                </div>
                <div className="mt-10 text-center text-sm leading-10 text-gray-400">
                  <p>MP4 or WebM or ogg</p>
                  <p>720x1280 or higher</p>
                  <p>Up to 10 minutes</p>
                  <p>Less than 2GB</p>
                </div>
                <span className="mt-10 w-52 rounded bg-accent p-2 text-center font-medium font-medium text-white">
                  Select a file
                </span>
              </div>
              <input type="file" name="upload-video" className="h-0 w-0" onChange={handleUpload} />
            </label>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
