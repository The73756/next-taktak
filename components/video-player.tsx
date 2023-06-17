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
    <div className="group relative mt-0 gap-4 md:mt-5 lg:mt-0 lg:ml-20">
      <Link href={`${Routes.DETAIL}/${postId}`} className="rounded-3xl">
        <video
          loop
          ref={videoRef}
          muted={isVideoMuted}
          src={videoUrl}
          className="h-[300px] w-auto rounded-3xl bg-gray-100 md:h-[400px] md:w-[500px] lg:h-[530px] lg:w-[600px]"
        />
      </Link>
      <div className="absolute -bottom-12 left-8 flex w-auto  max-w-[380px] gap-10 p-3 md:bottom-2 md:left-14 md:w-full md:justify-between lg:bottom-6 lg:left-0 lg:max-w-[600px]">
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
