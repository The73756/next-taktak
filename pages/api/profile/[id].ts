import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/client';
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '@/utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { id } = req.query;

      if (!id) {
        res.status(400).json('Missing id');
        return;
      }

      try {
        const data = await client.fetch(singleUserQuery(id));
        const userVideos = await client.fetch(userCreatedPostsQuery(id));
        const userLikes = await client.fetch(userLikedPostsQuery(id));

        const response = {
          user: { ...data[0] },
          userVideos,
          userLikes,
        };

        res.status(200).json(response);
      } catch (e) {
        console.log(e);
        res.status(500).json('Something went wrong');
      }
  }
}
