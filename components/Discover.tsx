import { topics } from '@/utils/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  return (
    <div className="pb-6 xl:border-b-2 xl:border-gray-200">
      <p className="m-3 mt-4 hidden font-semibold text-gray-500 xl:block">Popular Topics</p>
      <div className="flex flex-wrap justify-center gap-3">
        {topics.map((item) => (
          <Link
            href={`/?topic=${item.name}`}
            key={item.name}
            className={topic === item.name ? 'activeTopic' : 'topic'}>
            <span className="text-xl font-bold">{item.icon}</span>
            <span className="hidden font-medium capitalize xl:block">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
