import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FaUsers, FaSchool, FaCalendarAlt, FaBell, FaNewspaper } from 'react-icons/fa';
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react'

const AdminSidebar = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = useSupabaseClient();
  const session = useSession()

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (session) {
        try {
          const { data, error } = await supabase
            .from('ADMINS')
            .select('*')
            .eq('email', session?.user?.email)

          if (error) {
            console.error('Error fetching admin data:', error);
            setIsAdmin(false);
          } else {
            setIsAdmin(data.length > 0);
          }
        } catch (err) {
          console.error('Unexpected error:', err);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [session, supabase]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="bg-gray-100 w-64 min-h-screen h-full py-4 px-2">
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/admin/users/users" legacyBehavior>
              <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">
                <FaUsers className="mr-2" />
                会員管理
              </a>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/schools/schools" legacyBehavior>
              <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">
                <FaSchool className="mr-2" />
                学校情報管理
              </a>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/events/events" legacyBehavior>
              <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">
                <FaCalendarAlt className="mr-2" />
                イベント情報管理
              </a>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/news/news" legacyBehavior>
              <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">
                <FaNewspaper className="mr-2" />
                お知らせ掲載
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
