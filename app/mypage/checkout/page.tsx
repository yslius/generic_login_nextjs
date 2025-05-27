'use client'
import { useEffect, useState } from 'react';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
  Elements,
  PaymentElement,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { logger } from '@/logger';

interface SetupIntent {
  client_secret: string;
  customer_id?: string;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Subscribe = () => {
  const [intent, setIntent] = useState<SetupIntent | null>(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    logger.info("APIにデータを送信");
    // APIにデータを送信
    fetch('/api/setup-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username || 'anonymous',
        // 他の必要なデータをここに追加
      })
    })
    .then(res => res.json())
    .then(data => {
      setIntent(data);
      if (data.customer_id) {
        window.localStorage.setItem('customer_id', data.customer_id);
      }
    })
    .catch(e => {
      console.error('Error:', e);
    });
  }, [username]);
  
  if (!intent || !intent.client_secret) return <p>loading</p>;
  
  const options = {
    appearance: {
      theme: 'stripe' as const,
    },
    clientSecret: intent.client_secret,
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          ユーザー名
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="ユーザー名を入力"
        />
      </div>

      <Elements stripe={stripePromise} options={options}>
        <PaymentElement />
      </Elements>
    </div>
  );
}

export default Subscribe;