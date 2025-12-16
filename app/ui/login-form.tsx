'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';


export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  // URLパラメータからエラーを取得（OAuthエラーなど）
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      switch (error) {
        case 'OAuthSignin':
        case 'OAuthCallback':
        case 'OAuthCreateAccount':
        case 'EmailCreateAccount':
        case 'Callback':
          setErrorMessage('ログインに失敗しました。もう一度お試しください。');
          break;
        case 'OAuthAccountNotLinked':
          setErrorMessage('このメールアドレスは既に別の方法で登録されています。');
          break;
        case 'EmailSignin':
          setErrorMessage('メールアドレスの確認に失敗しました。');
          break;
        case 'CredentialsSignin':
          setErrorMessage('メールアドレスまたはパスワードが正しくありません。');
          break;
        default:
          setErrorMessage('ログインに失敗しました。');
      }
    }
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await authenticate(undefined, formData);
    
    if (result === null || result === undefined) {
      await router.refresh();
      window.location.href = "/mypage";
    } else {
      setErrorMessage(result);
      setIsPending(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsPending(true);
    setErrorMessage(null);
    try {
      // エラーが発生した場合、URLパラメータでエラーが返される
    } catch (error) {
      console.error("Google sign in error:", error);
      setErrorMessage('Googleログインに失敗しました。もう一度お試しください。');
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                disabled={isPending}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                disabled={isPending}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full" disabled={isPending}>
          {isPending ? 'ログイン中...' : 'Log in'} <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>

        {/* Googleログインボタン */}
        <div className="mt-6 border-t pt-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            🔵 Googleでログイン
          </button>
        </div>
      </div>
    </form>
  );
}
