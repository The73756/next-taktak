import { SanityAssetDocument } from '@sanity/client'
import axios from 'axios'
import { IUser } from '@/types/user'
import { BASE_URL } from '@/utils/constants'

interface ICreateVideoProps {
  caption: string
  category: string
  videoAsset: SanityAssetDocument
  userProfile: IUser
}

export const createVideo = async ({
  caption,
  category,
  videoAsset,
  userProfile,
}: ICreateVideoProps) => {
  const document = {
    _type: 'post',
    caption,
    video: {
      _type: 'file',
      asset: {
        _type: 'reference',
        _ref: videoAsset._id,
      },
    },
    userId: userProfile._id,
    postedBy: {
      _type: 'postedBy',
      _ref: userProfile._id,
    },
    topic: category,
  }

  await axios.post(`${BASE_URL}/api/post`, document)
}
