import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "@/app/lib/prisma"; 

// const prisma = new PrismaClient();

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log("getUser result:", user); // ← デバッグ追加
    return user as unknown as User | undefined;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const config = {
  adapter: PrismaAdapter(prisma),
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    Credentials({
      async authorize(credentials) {
        console.log("async authorize(credentials)");
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          if (!user.password) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
  basePath: "/api/auth",
  pages: {
    signIn: "/login",
    error: "/login", // エラー時もログインページにリダイレクト
  },
  callbacks: {
    async signIn({ user, account }) {
      // Google OAuthの場合の処理
      if (account?.provider === "google") {
        try {
          // ユーザーが既に存在するか確認
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email || undefined },
          });
          
          if (!existingUser && user.email) {
            // 新規ユーザーの場合は作成（PrismaAdapterが自動的に処理するはずですが、念のため）
            console.log("Creating new user from Google OAuth:", user.email);
          }
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, trigger, session, user }) {
      if (trigger === "update") {
        token.name = session.user.name;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth }) {
      return !!auth;
    },
  },
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development", // 開発環境でデバッグを有効化
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);