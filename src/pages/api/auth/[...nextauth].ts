import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { connect } from '../../../utils/database';

export default NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: 'text' },
      },
      async authorize(credentials) {
        // Connect to DB
        const { db } = await connect();

        // Get all the users
        const users = await db.collection('users');
        // Find user with the email
        const result = await users.findOne({
          email: credentials?.email,
        });

        // Not found - send error res
        if (!result) {
          throw new Error('No user found with the email');
        }

        return { email: result.email };
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
});
