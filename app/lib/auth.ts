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
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
  basePath: "/api/auth",
  callbacks: {
    authorized({ auth }) {
      return !!auth;
    },
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);