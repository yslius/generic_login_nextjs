import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const ConfirmPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [desiredSchool, setDesiredSchool] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('ユーザープロフィールの取得エラー:', error);
          // デフォルト値を設定
          setName('山田 太郎');
          setEmail('yamada.taro@example.com');
          setDesiredSchool('東京大学 法学部');
        } else {
          setName(profile.name || '山田 太郎');
          setEmail(profile.email || 'yamada.taro@example.com');
          setDesiredSchool(profile.desired_school || '東京大学 法学部');
        }
      } else {
        // ログインしていない場合の処理
        router.push('/login');
      }
    };

    getUserData();
  }, [router]);

  const handleUpdate = async () => {
    if (!user) return;

    // 実際の更新処理はまだ実装されていません。
    alert('更新処理はまだ実装されていません。');
    router.push('/mypage');
  };

  const handleEdit = () => {
    router.push('/mypage/edit');
  };

  if (!user) {
    return <div className="min-h-screen h-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto py-8">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">会員情報更新確認</h1>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">氏名:</label>
            <div className="border rounded-md py-2 px-3 bg-gray-100">{name}</div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">メールアドレス:</label>
            <div className="border rounded-md py-2 px-3 bg-gray-100">{email}</div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">志望校:</label>
            <div className="border rounded-md py-2 px-3 bg-gray-100">{desiredSchool}</div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={handleUpdate}
            >
              更新
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleEdit}
            >
              修正
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConfirmPage;
