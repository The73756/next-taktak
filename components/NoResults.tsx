import { MdOutlineVideocamOff } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';

interface INoResultsProps {
  text: string;
  type: 'video' | 'comment';
}
const NoResults = ({ text, type }: INoResultsProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <span className="text-6xl">
        {type === 'video' ? <MdOutlineVideocamOff /> : <BiCommentX />}
      </span>
      <span className="text-center text-2xl">{text}</span>
    </div>
  );
};

export default NoResults;
