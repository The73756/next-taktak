import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '@/utils/client'
import { getQueryParams } from '@/utils/get-query-params'
import { topicPostsQuery } from '@/utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { topic } = req.query
    const { offset, calculatedLimit } = getQueryParams(req)

    try {
      const data = await client.fetch(topicPostsQuery(String(topic), offset, calculatedLimit))
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json('Something went wrong')
    }
  }
}
