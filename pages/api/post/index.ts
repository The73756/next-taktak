import type { NextApiRequest, NextApiResponse } from 'next';
import { allPostsQuery } from '@/utils/queries';
import { client } from '@/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const query = allPostsQuery();
      const data = await client.fetch(query);
      res.status(200).json(data);
      break;
    case 'POST':
      const document = req.body;
      console.log(document);

      try {
        await client.create(document);
        res.status(201).json({ message: 'Video Created!' });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Something went wrong' });
      }
  }
}
