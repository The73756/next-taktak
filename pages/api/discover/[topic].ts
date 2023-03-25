import type { NextApiRequest, NextApiResponse } from 'next';
import { topicPostsQuery } from '@/utils/queries';
import { client } from '@/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { topic } = req.query;

      try {
        const data = await client.fetch(topicPostsQuery(topic + ''));
        res.status(200).json(data);
      } catch (e) {
        console.log(e);
        res.status(500).json('Something went wrong');
      }

      break;
  }
}
