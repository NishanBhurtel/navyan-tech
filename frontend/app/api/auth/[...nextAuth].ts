// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authApi } from "@/lib/api/auth.api";

// ✅ Extend NextAuth types to include your custom fields
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

  interface JWT {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "admin" | "customer";
    accessToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await authApi.loginApi({
            email: credentials?.email || "",
            password: credentials?.password || "",
          });

          // Expecting backend response { _id, email, firstName, lastName, token, role }
          const user = res.data;

          if (user && user.token) {
            return user; // returned user is passed to jwt callback
          }

          return null;
        } catch (err) {
          console.error("Login error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // On login
      if (user) {
        token._id = user._id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.accessToken = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id as string;
        session.user.email = token.email as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.role = token.role as "admin" | "customer";
        session.user.token = token.accessToken as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
