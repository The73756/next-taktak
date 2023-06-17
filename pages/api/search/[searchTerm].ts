import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '@/utils/client'
import { searchPostsQuery, searchUsersQuery } from '@/utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { searchTerm } = req.query

    if (!searchTerm) {
      res.status(400).json('No search term provided')
      return
    }

    try {
      const videos = await client.fetch(searchPostsQuery(searchTerm + ''.trim()))
      const users = await client.fetch(searchUsersQuery(searchTerm + ''.trim()))
      res.status(200).json({
        videos,
        users,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json('Something went wrong')
    }
  }
}
