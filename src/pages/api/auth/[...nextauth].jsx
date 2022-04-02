import NextAuth from "next";
import Auth0Provioder from "next-auth/providers/auth0";

const options = {
  providers: [
    Auth0Provider({
      clientId: '6ACtQktajUydnzxHKEmCblmKunrQGKul',
      clientSecret: 'wnwlr196JRButygXGIdW4OnY-PG5R5TrzpCgLmgFG3Ct3HM5_CZruffCyAXZxGj5',
      domain: 'dev-rfnr7fci.us.auth0.com'

    }),
  ],

};

export default (req, res) =>
  NextAuth(req, res, options);