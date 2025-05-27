import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const AdminHeader = () => {
  const router = useRouter();
  const user = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('ADMINS')
            .select('*')
            .eq('email', user?.email)
            .single();

          if (error) {
            console.error('Error fetching admin data:', error);
            setIsAdmin(false);
            return;
          }

          setIsAdmin(!!data);
        } catch (err) {
          console.error('Unexpected error:', err);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="text-2xl font-bold text-gray-800">
          管理コンソール
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/admin/users" className="text-gray-700 hover:text-blue-500">
            会員管理
          </Link>
          <Link href="/admin/schools" className="text-gray-700 hover:text-blue-500">
            学校管理
          </Link>
          <Link href="/admin/events" className="text-gray-700 hover:text-blue-500">
            イベント管理
          </Link>
          <Link href="/admin/news" className="text-gray-700 hover:text-blue-500">
            お知らせ管理
          </Link>
           <Link href="/admin/reports" className="text-gray-700 hover:text-blue-500">
           レポート
          </Link>
          {
            isAdmin && user ? (
              <button onClick={handleSignOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                サインアウト
              </button>
            ) : null
          }
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu (Conditional Rendering) */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 py-2 px-4">
          <Link href="/admin/users" className="block py-2 text-gray-700 hover:text-blue-500">
            会員管理
          </Link>
          <Link href="/admin/schools" className="block py-2 text-gray-700 hover:text-blue-500">
            学校管理
          </Link>
          <Link href="/admin/events" className="block py-2 text-gray-700 hover:text-blue-500">
            イベント管理
          </Link>
          <Link href="/admin/news" className="block py-2 text-gray-700 hover:text-blue-500">
            お知らせ管理
          </Link>
           <Link href="/admin/reports" className="block py-2 text-gray-700 hover:text-blue-500">
           レポート
          </Link>
          {
            isAdmin && user ? (
              <button onClick={handleSignOut} className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                サインアウト
              </button>
            ) : null
          }
        </div>
      )}
    </header>
  );
};

export default AdminHeader;