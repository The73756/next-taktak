import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const user = req.body;

      try {
        await client.createIfNotExists(user);
        res.status(200).json('Login successful');
      } catch (e) {
        console.log(e);
        res.status(400).json('Login failed');
      }
  }
}
