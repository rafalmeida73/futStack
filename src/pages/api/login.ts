import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../utils/database';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === 'POST') {
    try {
      const {
        email,
      } = req.body;

      if (!email) {
        res.status(400).json({ message: 'Please fill in the email fields' });
        return;
      }
      const { db, client } = await connect();

      // Get all the users
      const users = await db.collection('users');
      // Find user with the email
      const result = await users.findOne({
        email,
      });

      if (result) {
        res.status(200).json({ message: 'Login successfully' });
        return;
      }

      // Not found - send error res
      client.close();
      res.status(401).json({ message: 'User not found. Check your email and password and try again.' });
    } catch (error) {
      res.status(400).json({ message: 'An error occurred while logging in. Try again later' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method not allowed');
  }
};
