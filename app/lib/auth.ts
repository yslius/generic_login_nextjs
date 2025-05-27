import NextAuth from 'next-auth';
import Github from "next-auth/providers/github";
import { authConfig } from '../../auth.config';
import Credentials from 'next-auth/providers/credentials';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client'
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from "next-auth";

const prisma = new PrismaClient();

// export default NextAuth({
//   callbacks: {
//     async jwt({ token, account }) {
//       // Persist the OAuth access_token to the token right after signin
//       if (account) {
//         token.accessToken = account.access_token
//       }
//       return token
//     },
//     async session({ session, token, user }) {
//       // Send properties to the client, like an access_token from a provider.
//       // session.accessToken = token.accessToken
//       return { ...session, ...token }
//     }
//   },
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         console.log("async authorize(credentials)");

//         // 入力データのバリデーション
//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials);

//         if (!parsedCredentials.success) {
//           console.log('Invalid credentials format');
//           return null;
//         }

//         const { email, password } = parsedCredentials.data;

//         // ユーザーをデータベースから取得
//         const user = await prisma.user.findUnique({
//           where: { email },
//         });

//         if (!user) {
//           console.log('User not found');
//           return null;
//         }

//         // パスワードの検証
//         const passwordsMatch = await bcrypt.compare(password, user.password);
//         if (!passwordsMatch) {
//           console.log('Invalid password');
//           return null;
//         }

//         // 認証成功
//         console.log('Authentication successful');
//         return user;
//       },
//     }),
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.$queryRaw<User>`SELECT * FROM users WHERE email=${email}`;
    console.log(user);
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}


export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
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
        
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  basePath: "/api/auth",
  callbacks: {
    authorized({ request, auth }) {
      try {
        const { pathname } = request.nextUrl;
        if (pathname === "/server-example") return !!auth; //ログインしているユーザーだけ見れるページだよ。
        return true; //ログインしてなくても取りあえず全ページ見れるよ。
      } catch (err) {
        console.log(err);
      }
    },
    jwt({ token, trigger, session }) {
      // console.log(token);
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         console.log("async authorize(credentials)");
//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials);
        
//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data;
//           const user = await getUser(email);
//           return user;
//           if (!user) return null;
//           const passwordsMatch = await bcrypt.compare(password, user.password);
//           // await createSession(user.id)
//           if (passwordsMatch) return user;
//         }
        
//         console.log('Invalid credentials');
//         return null;
//       },
//     }),
//   ],
// });

