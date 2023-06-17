import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '@/utils/client'
import { topicPostsQuery } from '@/utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { topic } = req.query
    const page = Number(req.query.page || '1')
    const limit = Number(req.query.limit || '4')
    const offset = (page - 1) * limit
    const calculatedLimit = limit + offset

    try {
      const data = await client.fetch(topicPostsQuery(String(topic), offset, calculatedLimit))
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json('Something went wrong')
    }
  }
}
