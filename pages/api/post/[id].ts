/* eslint-disable no-case-declarations */
import type { NextApiRequest, NextApiResponse } from 'next'
import { uuid } from 'uuidv4'
import { client } from '@/utils/client'
import { postDetailQuery } from '@/utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { id } = req.query
      if (!id) {
        res.status(400).json({ message: 'Missing id' })
        return
      }

      try {
        const data = await client.fetch(postDetailQuery(id))
        res.status(200).json(data[0])
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' })
      }
      break
    case 'PUT':
      const { comment, userProfile } = req.body
      const postId = req.query.id
      const _key = uuid()

      try {
        await client
          .patch(String(postId))
          .setIfMissing({ comments: [] })
          .insert('after', 'comments[-1]', [
            {
              comment,
              _key,
              postedBy: { _type: 'postedBy', _ref: userProfile._id },
            },
          ])
          .commit()

        res.status(200).json({ comment, postedBy: userProfile, _key })
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' })
      }
      break

    default: {
      break
    }
  }
}
