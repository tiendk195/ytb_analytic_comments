import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handle = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
});

export { handle as GET, handle as POST };
