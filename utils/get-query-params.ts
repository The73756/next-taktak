import { NextApiRequest } from 'next'
import { VIDEO_LIMIT } from '@/utils/constants'

export const getQueryParams = (req: NextApiRequest) => {
  const page = Number(req.query.page || '1')
  const limit = Number(req.query.limit || VIDEO_LIMIT)
  const offset = (page - 1) * limit
  const calculatedLimit = limit + offset

  return {
    page,
    limit,
    offset,
    calculatedLimit,
  }
}
