// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authApi } from "@/lib/api/auth.api";

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "admin" | "customer";
    token: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: "admin" | "customer";
      token: string;
    };
  }

  interface JWT {
    id: string;
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

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const data = await authApi.loginApi({
            email: credentials?.email || "",
            password: credentials?.password || "",
          });


          const user = data;

          if (!user) {
            return null;
          }

          if (!user.token) {
            return null;
          }

          if (user && user.token) {
            return {
              id: user.id,
              _id: user.id, // for backward compatibility
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              token: user.token,
            };
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
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.accessToken = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          role: token.role as "admin" | "customer",
          token: token.accessToken as string,
        };
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
