import { useRouter } from 'next/router';

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>Detail of video {id}</div>;
};

export default Detail;
