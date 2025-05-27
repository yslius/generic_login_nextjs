import React from 'react';
import { useRouter } from 'next/router';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Link from 'next/link';

const WithdrawalPage = () => {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();

  const handleWithdrawal = async () => {
    if (window.confirm('本当に退会しますか？この操作は取り消せません。')) {
      try {
        if (session) {
          const { error } = await supabase.auth.signOut();
          if (error) {
            console.error('ログアウトエラー:', error);
            alert('ログアウトに失敗しました。');
            return;
          }

          // Delete user data (optional, based on your requirements)
          // For example, you might have a 'users' table
          // await supabase.from('users').delete().eq('id', session.user.id);

          // Sign out the user
          await supabase.auth.signOut();
          router.push('/'); // Redirect to the home page
        } else {
          router.push('/login');
        }

      } catch (error) {
        console.error('退会処理エラー:', error);
        alert('退会処理に失敗しました。');
      }
    }
  };

  const handleCancel = () => {
    router.push('/mypage'); // マイページに戻る
  };

  return (
    <div className="min-h-screen h-full bg-gray-100 flex flex-col">
      <header className="bg-blue-500 py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-white text-2xl font-semibold">退会確認画面</h1>
        </div>
      </header>

      <main className="container mx-auto py-8 flex-grow">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
          <p className="text-lg text-center mb-4">本当に退会しますか？</p>
          <p className="text-sm text-gray-500 text-center mb-6">
            この操作は取り消せません
          </p>

          <div className="flex justify-center space-x-4">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleWithdrawal}
            >
              退会する
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={handleCancel}
            >
              キャンセル
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 py-4 text-center text-white">
        <p>&copy; 2025 受験コンシェルジュ</p>
      </footer>
    </div>
  );
};

export default WithdrawalPage;
