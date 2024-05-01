import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID ??
        "1033135223027-gcld3mactbhri64futmuq7c2jrifpv1l.apps.googleusercontent.com",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ??
        "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",
    }),
  ],
  callbacks: {
    jwt: ({ token, account }) => {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.access_token = token.access_token;
      session.user.id = token.id;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
