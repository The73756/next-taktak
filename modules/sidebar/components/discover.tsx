import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { topics } from '@/utils/topics'

export const Discover = () => {
  const router = useRouter()
  const { topic } = router.query
  const [activeTopic, setActiveTopic] = useState(topic)

  useEffect(() => {
    setActiveTopic(topic)
  }, [topic])

  const handleTopicClick = (topic: string) => {
    if (activeTopic === topic) {
      setActiveTopic('')
    } else {
      setActiveTopic(topic)
    }
  }

  return (
    <div className="pb-6 xl:border-b-2 xl:border-gray-200">
      <p className="m-3 mt-4 hidden font-semibold text-gray-500 xl:block">Popular Topics</p>
      <div className="flex flex-wrap justify-center gap-3">
        {topics.map((item) => (
          <Link
            key={item.name}
            href={activeTopic === item.name ? '/' : `/?topic=${item.name}`}
            onClick={() => handleTopicClick(item.name)}
            className={activeTopic === item.name ? 'activeTopic' : 'topic'}
          >
            <span className="text-xl font-bold">{item.icon}</span>
            <span className="hidden font-medium capitalize xl:block">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
