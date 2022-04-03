import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { apiBd } from '../../../services/apiBd';
import { connect } from '../../../utils/database';

export default NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: 'text' },
      },
      async authorize(credentials) {
        const { db, client } = await connect();

        // Get all the users
        const users = await db.collection('users');
        // Find user with the email
        const result = await users.findOne({
          email: credentials?.email,
        });

        if (result) {
          return result;
        }

        // Not found - send error res
        client.close();
        throw new Error('error message');
      },
    }),
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      try {
        if (account.provider === 'google') {
          const { db } = await connect();

          const users = await db.collection('users');

          const result = await users.findOne({
            email: profile.email,
          });

          if (!result) {
            await apiBd.post('user', {
              nome: profile?.name,
              email: profile?.email,
            });
          }
        }

        return true;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return false;
      }
    },
  },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
});
