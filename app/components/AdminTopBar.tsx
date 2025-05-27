import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Session } from '@supabase/supabase-js';

const AdminTopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();
  const supabase = useSupabaseClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.email) {
        setEmail(session.user.email);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.email) {
        setEmail(session.user.email);
      }
    });
  }, [supabase]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="bg-darkgray text-white shadow-md">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none lg:hidden">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          <span className="text-xl font-semibold ml-4">管理画面</span>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          {email && <span className="text-gray-300">ようこそ、{email}</span>}
          <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            ログアウト
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-darkgray py-4 px-6 z-10">
            {email && <div className="mb-2">ようこそ、{email}</div>}
            <button onClick={handleLogout} className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-center">
              ログアウト
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTopBar;
