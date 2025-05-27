import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const Complete = () => {
  const router = useRouter();

  useEffect(() => {
    // ページがマウントされたときに実行される処理（必要に応じて）
  }, []);

  const handleBackToMypage = () => {
    router.push('/mypage');
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-center">
            <svg
              className="text-green-500 w-12 h-12 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <h1 className="text-2xl font-semibold text-gray-800">会員情報の更新が完了しました</h1>
          </div>
          <p className="text-center text-gray-600 mt-4">
            変更内容を正常に保存しました。
          </p>
          <div className="flex justify-center mt-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleBackToMypage}
            >
              マイページへ戻る
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Complete;

// ダミーのヘッダーコンポーネント
const HeaderComponent = () => (
  <header className="bg-blue-500 py-4">
    <div className="container mx-auto">
      <h1 className="text-white text-2xl font-bold">会員情報更新</h1>
    </div>
  </header>
);

// ダミーのフッターコンポーネント
const FooterComponent = () => (
  <footer className="bg-gray-800 py-4 text-white text-center">
    &copy; 2025 会員管理システム
  </footer>
);
