import { FC } from 'react';

interface INoResultsProps {
  text: string;
}
const NoResults: FC<INoResultsProps> = ({ text }) => {
  return <div>{text}</div>;
};

export default NoResults;
