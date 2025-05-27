import { NextResponse } from 'next/server';
import stripe from '@/app/lib/stripe';
import { logger } from '@/logger';

export async function POST(request: Request) {
  try {
    logger.info("app/api/subscribe/route.ts");
    const body = await request.json();
    const { name, email, paymentMethodId } = body;

    // 顧客の作成
    const customer = await stripe.customers.create({
      name: name,
      email: email,
      payment_method: paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // サブスクリプションの作成
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: 'prod_S3xe0Ydvdp5Uhp' }],
      expand: ['latest_invoice.payment_intent'],
    });

    return NextResponse.json({ status: subscription.status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 