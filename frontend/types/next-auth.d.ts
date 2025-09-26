// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "admin" | "customer";
    token: string;
  }

  interface Session {
    user: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: "admin" | "customer";
      token: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "admin" | "customer";
    accessToken: string;
  }
}
