'use client'

import { useState } from 'react';
import Link from "next/link";

const MyPage = () => {
  const [profile] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <header className="bg-indigo-500 text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-semibold">マイページ</h1>
        </div>
      </header>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <aside className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-semibold mb-2">メニュー</h2>
              <ul>
                <li className="mb-2">
                  <Link href="/" className="hover:text-blue-500">トップへ</Link>
                </li>
                <li className="mb-2">
                  <Link href="/mypage" className="hover:text-blue-500">マイページ</Link>
                </li>
              </ul>
            </aside>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white shadow rounded p-6">
              <h2 className="text-xl font-semibold mb-4">会員情報</h2>
              {profile ? (
                <div className="space-y-2">
                  <p>氏名: {profile.name}</p>
                  <p>メールアドレス: {profile.email}</p>
                </div>
              ) : (
                <p>会員情報を取得できませんでした。</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;