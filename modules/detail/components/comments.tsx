import { FormEvent, useState } from 'react'
import { CommentItem } from '@/modules/detail'
import useAuthStore from '@/store/auth-store'
import { IComment } from '@/types/comment'
import { NoResults } from '@/ui/no-results'

interface ICommentsProps {
  comments: IComment[]
  addComment: (comment: string) => void
}

export const Comments = ({ comments, addComment }: ICommentsProps) => {
  const [isPostingComment, setIsPostingComment] = useState(false)
  const [commentText, setCommentText] = useState('')
  const { userProfile } = useAuthStore()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsPostingComment(true)

      if (userProfile && commentText) {
        await addComment(commentText)
      }

      setCommentText('')
    } catch (error) {
      console.log(error)
    } finally {
      setIsPostingComment(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div className="max-h-[450px] flex-1 border-y-2 border-gray-200 bg-gray-100 px-10 pt-4 lg:pb-0">
        <div className="flex h-full flex-col gap-2 overflow-scroll">
          {comments.length > 0 ? (
            comments.map(({ comment, postedBy, _key }) => (
              <CommentItem key={_key} comment={comment} postedBy={postedBy} />
            ))
          ) : (
            <NoResults text="No comments" type="comment" />
          )}
        </div>
      </div>
      {userProfile && (
        <div className="mt-auto w-full px-2 pb-6 md:px-10">
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add the comment"
              className="w-full flex-1 rounded-lg border-2 border-gray-100 bg-primary px-6 py-4 font-medium transition-colors duration-300 focus:border-gray-300 focus:outline-none"
            />
            <button className="rounded-lg border-2 border-2 border-gray-100 px-8 text-gray-400 transition-colors duration-300 hover:border-gray-300">
              {isPostingComment ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
