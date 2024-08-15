import dbConect from "@/lib/dbConnection";
import User from "@/models/user.model";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req): Promise<any> {
        // Add logic here to look up the user from the credentials supplied
        await dbConect();
        try {
          const user = await User.findOne({
            email: credentials.identifier.email,
          });
          if (!user) {
            throw new Error("no such user.");
          }
          if (!user.isVarified) {
            throw new Error("pls verify the user.");
          }
          const chekUser = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (chekUser) {
            return user;
          } else {
            throw new Error("wrong credentials.");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      (session.user._id = token._id),
        (session.user.isReciving = token.isReciving),
        (session.user.username = token.username),
        (session.user.isVarified = token.isVarified);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        (token._id = user._id), (token.isVarified = user.isVarified);
        (token.username = user.username), (token.isReciving = user.isReciving);
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
