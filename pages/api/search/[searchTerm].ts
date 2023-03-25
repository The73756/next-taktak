import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/client';
import { searchPostsQuery, searchUsersQuery } from '@/utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { searchTerm } = req.query;

      if (!searchTerm) {
        res.status(400).json('No search term provided');
        return;
      }

      try {
        const videos = await client.fetch(searchPostsQuery(searchTerm + ''.trim()));
        const users = await client.fetch(searchUsersQuery(searchTerm + ''.trim()));
        res.status(200).json({
          videos,
          users,
        });
      } catch (e) {
        console.log(e);
        res.status(500).json('Something went wrong');
      }
  }
}
