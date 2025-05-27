import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { signOut } from '@/app/lib/auth';

const TopBar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if the user is logged in and fetch user data from local storage
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserName = localStorage.getItem('userName') || '';

    setIsLoggedIn(storedIsLoggedIn);
    setUserName(storedUserName);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');

    // Update state
    setIsLoggedIn(false);
    setUserName('');

    signOut();

    // Redirect to the top page
    router.push('/');
  };

  return (
    <div className="bg-blue-500 text-white py-4 px-6 min-h-screen h-full">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">受験コンシェルジュ</Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/schools" className="hover:text-gray-200">学校一覧</Link>
          <Link href="/events" className="hover:text-gray-200">イベント</Link>
          <Link href="/search" className="hover:text-gray-200">学校検索</Link>

          {isLoggedIn ? (
            <>
              <span className="text-white">こんにちは、{userName} さん</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link href="/register" className="hover:text-gray-200">会員登録</Link>
              <Link href="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                ログイン
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <FaBars className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <Link href="/schools" className="block py-2 hover:bg-blue-700 px-4">学校一覧</Link>
          <Link href="/events" className="block py-2 hover:bg-blue-700 px-4">イベント</Link>
          <Link href="/search" className="block py-2 hover:bg-blue-700 px-4">学校検索</Link>
          {
            isLoggedIn ? (
              <>
                <span className="block py-2 px-4">こんにちは、{userName} さん</span>
                <button onClick={handleLogout} className="block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link href="/register" className="block py-2 hover:bg-blue-700 px-4">会員登録</Link>
                <Link href="/login" className="block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  ログイン
                </Link>
              </>
            )
          }
        </div>
      )}
    </div>
  );
};

export default TopBar;
