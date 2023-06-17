import { useEffect, useState } from 'react'
import { MdFavorite } from 'react-icons/md'
import useAuthStore from '@/store/auth-store'
import { ILike } from '@/types/video'

interface ILikeButtonProps {
  likes: ILike[]
  flex: string
  handleClick: (like: boolean) => void
}

export const LikeButton = ({ likes, flex, handleClick }: ILikeButtonProps) => {
  const [liked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(likes.length)
  const { userProfile } = useAuthStore()

  const likesInfo = {
    prevLikes: likes,
    liked: likes.filter((item) => item._ref === userProfile?._id).length > 0,
  }

  useEffect(() => {
    setIsLiked(likesInfo.liked)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLikeClick = async () => {
    setIsLiked((prev) => !prev)
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1))

    try {
      await handleClick(!liked)
    } catch (error) {
      console.log('Error on like, please reload the page', error)
      setIsLiked(likesInfo.liked)
      setLikesCount(likesInfo.prevLikes.length)
    }
  }

  return (
    <div className={`${flex} gap-6`}>
      <div className="mt-4  flex cursor-pointer flex-col items-center justify-center">
        <button
          className={`rounded-full bg-primary p-2 ${
            liked ? 'text-accent' : 'text-black'
          } transition-colors duration-300 md:p-4`}
          onClick={handleLikeClick}
        >
          <MdFavorite className="text-lg md:text-2xl" />
        </button>

        <p className="text-md font-semibold ">{likesCount}</p>
      </div>
    </div>
  )
}
