import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '@/utils/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const user = req.body

    try {
      await client.createIfNotExists(user)
      res.status(200).json('Login successful')
    } catch (error) {
      console.log(error)
      res.status(400).json('Login failed')
    }
  }
}
