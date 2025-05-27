import '@/app/styles/global.css';
import { inter } from '@/app/styles/fonts';
import { Metadata } from 'next';
import { SessionProvider } from "next-auth/react";
import Header from '@/app/components/Header';
import getServerSession from "next-auth";

export const metadata: Metadata = {
  title: {
    template: '%s | sitename001',
    default: 'sitename001',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
