import type { NextApiRequest, NextApiResponse } from 'next';
import { topicPostsQuery } from '@/utils/queries';
import { client } from '@/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { topic } = req.query;
      const page = Number(req.query.page || '1');
      const limit = Number(req.query.limit || '4');
      const offset = (page - 1) * limit;
      const calculatedLimit = limit + offset;

      try {
        const data = await client.fetch(topicPostsQuery(topic + '', offset, calculatedLimit));
        res.status(200).json(data);
      } catch (e) {
        console.log(e);
        res.status(500).json('Something went wrong');
      }

      break;
  }
}
