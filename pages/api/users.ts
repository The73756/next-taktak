import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '@/utils/client'
import { userSuggestedQuery } from '@/utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query

    try {
      const data = await client.fetch(userSuggestedQuery(String(id)))

      if (data) {
        res.status(200).json(data)
      } else {
        res.status(204).json([])
      }
    } catch (error) {
      console.log(error)
      res.status(500).json('Something went wrong')
    }
  }
}
