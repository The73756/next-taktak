import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi'
import { MdOutlineCancel } from 'react-icons/md'

interface IDetailVideoPlayerProps {
  videoUrl: string
}

export const DetailVideoPlayer = ({ videoUrl }: IDetailVideoPlayerProps) => {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)

  const handleVideoClick = () => {
    if (!videoRef.current) return

    if (isVideoPlaying) {
      videoRef.current.pause()
      setIsVideoPlaying(false)
    } else {
      void videoRef.current.play()
      setIsVideoPlaying(true)
    }
  }

  return (
    <div className="flex-2 relative flex w-[1000px] items-center justify-center bg-black lg:w-9/12">
      <div className="absolute top-6 left-2 z-50 flex gap-6 opacity-90 lg:left-6">
        <button
          onClick={() => router.back()}
          className="transition-opacity duration-300 hover:opacity-70"
        >
          <MdOutlineCancel className="color-red-900 text-[35px] text-white" />
        </button>
      </div>
      <div className="relative">
        <div className="h-[60vh] lg:h-[100vh]">
          <video
            onClick={handleVideoClick}
            src={videoUrl}
            ref={videoRef}
            loop
            className="h-full cursor-pointer"
          />
        </div>
        <div className="absolute top-[45%] left-[45%]  cursor-pointer">
          {!isVideoPlaying && (
            <button onClick={handleVideoClick}>
              <BsFillPlayFill className="text-6xl text-white lg:text-8xl" />
            </button>
          )}
        </div>
      </div>

      <div className="absolute  bottom-5 right-5 cursor-pointer lg:bottom-10  lg:right-10">
        {isVideoMuted ? (
          <button onClick={() => setIsVideoMuted(false)}>
            <HiVolumeOff className="text-3xl text-white lg:text-4xl" />
          </button>
        ) : (
          <button onClick={() => setIsVideoMuted(true)}>
            <HiVolumeUp className="text-3xl text-white lg:text-4xl" />
          </button>
        )}
      </div>
    </div>
  )
}
