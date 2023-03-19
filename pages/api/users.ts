import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/client';
import { userSuggestedQuery } from '@/utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { id } = req.query;

      try {
        const data = await client.fetch(userSuggestedQuery(id + ''));

        if (data) {
          res.status(200).json(data);
        } else {
          res.status(204).json([]);
        }
      } catch (e) {
        console.log(e);
        res.status(500).json('Something went wrong');
      }
  }
}
