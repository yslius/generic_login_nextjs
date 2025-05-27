import { NextResponse } from 'next/server';
import { auth } from "@/app/lib/auth";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export async function POST(request: Request) {
  // セッションチェック
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: '認証が必要です' },
      { status: 401 }
    );
  }

  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // 顧客を作成または既存の顧客を検索
    const customer = await stripe.customers.list({
        email: session.user?.email || '',
    }).then((customers: any) => {
        if (customers.data.length) {
            return customers.data[0];
        }
        if (!session.user?.email) {
            throw new Error('User email is required');
        }
        return stripe.customers.create({
            email: session.user.email,
            metadata: {
                app_username: session.user.name || 'anonymous'
            },
        });
    });
    
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card']
    });

    return NextResponse.json({
      client_secret: setupIntent.client_secret,
      customer_id: customer.id,
    });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: error.message || 'Error creating setup intent' },
      { status: 500 }
    );
  }
} 