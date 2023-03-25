import { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { VideoUploader } from '@/modules/VideoUploader';
import { LayoutWithOnlyHeader } from '@/components/LayoutWithOnlyHeader';

const Upload: NextPageWithLayout = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-20 rounded-lg bg-white p-14 pt-6 xl:h-[80vh]">
      <VideoUploader />
    </div>
  );
};

Upload.getLayout = function getLayout(page: ReactElement) {
  return <LayoutWithOnlyHeader>{page}</LayoutWithOnlyHeader>;
};

export default Upload;
