import { BiCommentX, BiUserX } from 'react-icons/bi'
import { MdOutlineVideocamOff } from 'react-icons/md'

interface INoResultsProps {
  text: string
  type: 'video' | 'comment' | 'user'
  className?: string
}

export const NoResults = ({ text, type, className }: INoResultsProps) => {
  let icon

  switch (type) {
    case 'video':
      icon = <MdOutlineVideocamOff />
      break
    case 'comment':
      icon = <BiCommentX />
      break
    case 'user':
      icon = <BiUserX />
      break
    default:
      break
  }

  return (
    <div className={`flex h-full w-full flex-col items-center justify-center ${className}`}>
      <span className="text-6xl">{icon}</span>
      <span className="text-center text-2xl">{text}</span>
    </div>
  )
}
