import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';
import { client } from '@/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'PUT':
      const { userId, postId, like } = req.body;
      let data;

      try {
        if (like) {
          data = await client
            .patch(postId)
            .setIfMissing({ likes: [] })
            .insert('after', 'likes[-1]', [
              {
                _key: uuid(),
                _ref: userId,
              },
            ])
            .commit();
        } else {
          data = await client
            .patch(postId)
            .unset([`likes[_ref=="${userId}"]`])
            .commit();
        }

        res.status(200).json(data);
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Something went wrong' });
      }
      res.status(200).json(data);
  }
}
