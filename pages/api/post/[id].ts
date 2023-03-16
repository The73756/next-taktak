import type { NextApiRequest, NextApiResponse } from 'next';
import { postDetailQuery } from '@/utils/queries';
import { client } from '@/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { id } = req.query;
      if (!id) {
        res.status(400).json({ message: 'Missing id' });
        return;
      }

      const query = postDetailQuery(id);

      try {
        const data = await client.fetch(query);
        res.status(200).json(data[0]);
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Something went wrong' });
      }
  }
}
