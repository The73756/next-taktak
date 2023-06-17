import Link from 'next/link'
import { useRef, useState } from 'react'
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi'
import { Routes } from '@/utils/constants'

interface IVideoPlayerProps {
  postId: string
  videoUrl: string
}

export const VideoPlayer = ({ postId, videoUrl }: IVideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoClick = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      void videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="group relative gap-4 lg:ml-20">
      <Link href={`${Routes.DETAIL}/${postId}`} className="rounded-3xl">
        <video
          loop
          ref={videoRef}
          muted={isVideoMuted}
          src={videoUrl}
          className="h-[300px] w-[200px] rounded-3xl bg-gray-100 md:h-[400px] lg:h-[530px] lg:w-[600px]"
        />
      </Link>
      <div className="absolute bottom-6 left-8 flex w-full max-w-[600px] gap-10 p-3 md:left-14 lg:left-0 lg:justify-between">
        <button className="videoControlBtn" onClick={handleVideoClick}>
          {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
        </button>

        <button
          className="videoControlBtn"
          onClick={() => setIsVideoMuted((prevState) => !prevState)}
        >
          {isVideoMuted ? <HiVolumeOff /> : <HiVolumeUp />}
        </button>
      </div>
    </div>
  )
}
