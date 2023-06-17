import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { IComment } from '@/types/comment'

type ICommentItemProps = Omit<IComment, '_key'>

export const CommentItem = ({ comment, postedBy }: ICommentItemProps) => {
  return (
    <div className="flex items-center gap-3 border-b-2 p-1">
      <Link href={`/profile/${postedBy._id}`}>
        <Image
          width={40}
          height={40}
          className="cursor-pointer rounded-full"
          src={postedBy.image}
          alt={`${postedBy.userName} profile image`}
        />
      </Link>
      <div className="flex flex-col gap-1">
        <p className="flex items-center gap-1 font-bold leading-6 text-primary">
          <span className="text-[18px]">{postedBy.userName}</span>{' '}
          <GoVerified className="text-blue-400" />
        </p>
        <p className="text-[18px]">{comment}</p>
      </div>
    </div>
  )
}
