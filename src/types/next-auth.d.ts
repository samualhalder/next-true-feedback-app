import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    isVarified?: boolean;
    username?: string;
    isReciving?: boolean;
  }
  interface Session {
    user: {
      _id?: string;
      isVarified?: boolean;
      username?: string;
      isReciving?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVarified?: boolean;
    username?: string;
    isReciving?: boolean;
  }
}
