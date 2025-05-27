import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const WithdrawalComplete = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    // ページがマウントされたときにセッション情報を取得
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Session:", session);

      // セッションがない場合、ログインページへリダイレクト
      if (!session) {
        router.push('/login');
      }
    };

    getSession();
  }, [router, supabase]);

  const handleTopPageClick = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">マイページ</h1>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            退会手続き完了
          </h2>
          <p className="text-gray-600 mb-6">
            退会手続きが正常に完了しました。
          </p>
          <button
            onClick={handleTopPageClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            トップページへ
          </button>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>© 2025 Company Name</p>
      </footer>
    </div>
  );
};

export default WithdrawalComplete;
