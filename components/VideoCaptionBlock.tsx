import { topics } from '@/utils/constants';

interface IVideoCaptionBlockProps {
  caption: string;
  category: typeof topics.values.name;
  setCaption: (caption: string) => void;
  setCategory: (category: typeof topics.values.name) => void;
  handlePost: () => void;
}

const VideoCaptionBlock = ({
  caption,
  category,
  setCaption,
  setCategory,
  handlePost,
}: IVideoCaptionBlockProps) => {
  return (
    <div className="flex flex-col gap-3 pb-10">
      <label className="font-medium">Caption</label>
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="rounded border-2 border-gray-200 p-2 outline-none"
      />
      <label>Choose a Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="cursor-pointer rounded border-2 border-gray-200 p-2 capitalize lg:p-4 ">
        {topics.map((topic) => (
          <option
            value={topic.name}
            key={topic.name}
            className="cursor-pointer bg-white p-2 capitalize text-gray-700 outline-none hover:bg-slate-300">
            {topic.name}
          </option>
        ))}
      </select>
      <div className="mt-10 flex gap-6">
        <button
          type="button"
          className="w-28 rounded border-2 border-gray-300 p-2 font-medium outline-none transition-colors duration-300 hover:bg-gray-300 lg:w-44">
          Discard
        </button>
        <button
          onClick={handlePost}
          type="button"
          className="w-28 rounded border-2 border-transparent bg-accent p-2 font-medium text-white outline-none transition-colors duration-300 hover:border-accent hover:bg-transparent hover:text-black lg:w-44">
          Post
        </button>
      </div>
    </div>
  );
};

export default VideoCaptionBlock;
