'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { Session } from '@supabase/supabase-js';
import {FaUser, FaHeart, FaCalendarAlt, FaBell} from 'react-icons/fa'
import { useSession } from "next-auth/react"

const MyPage = () => {
  // const [session, setSession] = useState<Session | null>(null);
  const { data: session } = useSession();
  const [profile, setProfile] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [favoriteSchools, setFavoriteSchools] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [events, setEvents] = useState<string[]>([]);
//   const router = useRouter();

  // const supabase = createClientComponentClient();

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, [supabase]);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     if (session?.user?.id) {
  //       try {
  //         const { data, error } = await supabase
  //           .from('USERS')
  //           .select('id, name, email')
  //           .eq('id', session.user.id)
  //           .single();

  //         if (error) {
  //           console.error('プロフィールの取得に失敗しました:', error.message);
  //           setProfile({
  //             id: 'サンプルID',
  //             name: '山田 太郎',
  //             email: 'yamada@example.com',
  //           });
  //         } else {
  //           setProfile(data as any);
  //         }
  //       } catch (err) {
  //         console.error('プロフィールの取得中にエラーが発生しました:', err);
  //         setProfile({
  //           id: 'サンプルID',
  //           name: '山田 太郎',
  //           email: 'yamada@example.com',
  //         });
  //       }
  //     } else {
  //       // サンプルデータを設定
  //       setProfile({
  //         id: 'サンプルID',
  //         name: '山田 太郎',
  //         email: 'yamada@example.com',
  //       });
  //     }
  //   };

  //   const fetchFavoriteSchools = async () => {
  //     if (session?.user?.id) {
  //       try {
  //         const { data, error } = await supabase
  //           .from('FAVORITE_SCHOOLS')
  //           .select('SCHOOLS(name)')
  //           .eq('user_id', session.user.id);

  //         if (error) {
  //           console.error('志望校リストの取得に失敗しました:', error.message);
  //           setFavoriteSchools(['東京大学', '京都大学']);
  //         } else {
  //           setFavoriteSchools(
  //             (data as any).map((item: any) => item.SCHOOLS.name) || []
  //           );
  //         }
  //       } catch (err) {
  //         console.error('志望校リストの取得中にエラーが発生しました:', err);
  //         setFavoriteSchools(['東京大学', '京都大学']);
  //       }
  //     } else {
  //       setFavoriteSchools(['東京大学', '京都大学']);
  //     }
  //   };

  //   const fetchAlerts = async () => {
  //     if (session?.user?.id) {
  //       try {
  //         const { data, error } = await supabase
  //           .from('ALERTS')
  //           .select('event_type')
  //           .eq('user_id', session.user.id);

  //         if (error) {
  //           console.error('アラート設定の取得に失敗しました:', error.message);
  //           setAlerts(['合格発表通知: オン']);
  //         } else {
  //           setAlerts((data as any).map((item: any) => item.event_type) || []);
  //         }
  //       } catch (err) {
  //         console.error('アラート設定の取得中にエラーが発生しました:', err);
  //         setAlerts(['合格発表通知: オン']);
  //       }
  //     } else {
  //       setAlerts(['合格発表通知: オン']);
  //     }
  //   };

  //   const fetchEvents = async () => {
  //     if (session?.user?.id) {
  //       try {
  //         const { data, error } = await supabase
  //           .from('EVENTS')
  //           .select('title, start_datetime')
  //           .gte('start_datetime', new Date().toISOString())
  //           .order('start_datetime', { ascending: true })

  //         if (error) {
  //           console.error('予約済み説明会の取得に失敗しました:', error.message);
  //           setEvents(['東京大学 オープンキャンパス - 2023/08/15']);
  //         } else {
  //           // Format date and time, handle null data
  //           const formattedEvents = data.map((event: any) => {
  //             const eventDate = new Date(event.start_datetime);
  //             return `${event.title} - ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`;
  //           });

  //           setEvents(formattedEvents || []);
  //         }
  //       } catch (err) {
  //         console.error('予約済み説明会の取得中にエラーが発生しました:', err);
  //         setEvents(['東京大学 オープンキャンパス - 2023/08/15']);
  //       }
  //     } else {
  //       setEvents(['東京大学 オープンキャンパス - 2023/08/15']);
  //     }
  //   };

  //   fetchProfile();
  //   fetchFavoriteSchools();
  //   fetchAlerts();
  //   fetchEvents();
  // }, [session?.user?.id, supabase]);

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <header className="bg-blue-500 text-white py-4">
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
                  <a href="/" className="hover:text-blue-500">トップページ</a>
                </li>
                <li className="mb-2">
                  <a href="/schools" className="hover:text-blue-500">学校一覧</a>
                </li>
                <li className="mb-2">
                  <a href="/mypage" className="hover:text-blue-500">マイページ</a>
                </li>
                 <li className="mb-2">
                    <a href="/settings" className="hover:text-blue-500">設定</a>
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

            <div className="bg-white shadow rounded p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">志望校リスト</h2>
              <ul>
                {favoriteSchools.length > 0 ? (
                  favoriteSchools.map((school, index) => (
                    <li key={index}>{index + 1}. {school}</li>
                  ))
                ) : (
                  <li>志望校は登録されていません。</li>
                )}
              </ul>
            </div>

            <div className="bg-white shadow rounded p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">予約済み説明会</h2>
              <ul>
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <li key={index}>{index + 1}. {event}</li>
                  ))
                ) : (
                  <li>予約済みの説明会はありません。</li>
                )}
              </ul>
            </div>

            <div className="bg-white shadow rounded p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">アラート設定</h2>
              <ul>
                {alerts.length > 0 ? (
                  alerts.map((alert, index) => (
                    <li key={index}>{alert}</li>
                  ))
                ) : (
                  <li>アラートは設定されていません。</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-4 text-center">
        © 2023 学校情報プラットフォーム
      </footer>
    </div>
  );
};

export default MyPage;