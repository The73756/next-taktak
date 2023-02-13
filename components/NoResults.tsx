interface INoResultsProps {
  text: string;
}
const NoResults = ({ text }: INoResultsProps) => {
  return <div>{text}</div>;
};

export default NoResults;
