"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
// import { useSupabaseClient } from '@supabase/auth-helpers-react'
// import { Session } from '@supabase/supabase-js';
import { useSession, signIn, signOut } from "next-auth/react"


const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();
  
  console.log('session', session);

  const [waiting, setWaiting] = useState<boolean>(false);

  const signIn = () => {
    setWaiting(true);

    // login()
    //   .catch((error) => {
    //     console.error(error?.code);
    //   })
    //   .finally(() => {
    //     setWaiting(false);
    //   });
  };
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    // await supabase.auth.signOut();
    signOut();
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          {/* 受験コンシェルジュ */}
          title001
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/schools" className="text-gray-600 hover:text-blue-500">
            学校一覧
          </Link>
          <Link href="/events" className="text-gray-600 hover:text-blue-500">
            説明会情報
          </Link>
          <Link href="/search" className="text-gray-600 hover:text-blue-500">
            学校検索
          </Link>
          {session ? (
            <>
              <Link href="/mypage" className="text-gray-600 hover:text-blue-500">
                マイページ
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-blue-500">
                ログイン
              </Link>
              <Link href="/register" className="text-gray-600 hover:text-blue-500">
                会員登録
              </Link>
            </>
          )}
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-500 focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-100 py-2 px-6">
          <Link href="/schools" className="block py-2 text-gray-600 hover:text-blue-500">
            学校一覧
          </Link>
          <Link href="/events" className="block py-2 text-gray-600 hover:text-blue-500">
            説明会情報
          </Link>
          <Link href="/search" className="block py-2 text-gray-600 hover:text-blue-500">
            学校検索
          </Link>
          {session ? (
            <>
              <Link href="/mypage" className="block py-2 text-gray-600 hover:text-blue-500">
                マイページ
              </Link>
              <button
                onClick={handleSignOut}
                className="block py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block py-2 text-gray-600 hover:text-blue-500">
                ログイン
              </Link>
              <Link href="/register" className="block py-2 text-gray-600 hover:text-blue-500">
                会員登録
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
