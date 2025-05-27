import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/app/lib/stripe';
import { sql } from '@vercel/postgres';
import { logger } from '@/logger';

export async function POST(request: NextRequest) {
  logger.info("Webhook received'");
  const signature = request.headers.get('stripe-signature');
  console.log('Signature:', signature);
  
  if (!signature) {
    console.log('Signature missing');
    return NextResponse.json({ message: 'Signature missing' }, { status: 401 });
  }

  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
  if (!STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET not set');
    throw new Error('STRIPE_WEBHOOK_SECRET environment variable is not set.');
  }

  const body = await request.text();
  console.log('Webhook body:', body);
  
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    STRIPE_WEBHOOK_SECRET,
  );
  console.log('Event type:', event.type);

  if (event.type === 'invoice.payment_succeeded') {
    console.log('Processing payment succeeded event');
    return NextResponse.json(handlePaymentSucceededEvent(event));
  } else {
    console.log(`Unhandled event type: ${event.type}`);
    return NextResponse.json(
      { message: 'Ignored event type' },
      { status: 200 },
    );
  }
}

async function handlePaymentSucceededEvent(event: Stripe.Event) {
  console.log('Starting payment succeeded handler');
  const invoice = event.data.object as Stripe.Invoice;
  const stripeSubscriptionId = (invoice as any).subscription as string;
  const stripeCustomerId = invoice.customer as string;
  console.log('Customer ID:', stripeCustomerId);
  console.log('Subscription ID:', stripeSubscriptionId);

  const { rows: userRows } = await sql<{ id: string }>`
    SELECT user_id as id FROM stripe_customers WHERE stripe_customer_id = ${stripeCustomerId}
  `;
  console.log('Found user rows:', userRows.length);

  if (userRows.length === 0) {
    console.error('User not found for Stripe Customer ID:', stripeCustomerId);
    return { status: 404, message: 'User not found' };
  }
  const userId = userRows[0].id;
  console.log('User ID:', userId);

  try {
    await sql`
      INSERT INTO subscriptions (
        user_id,
        stripe_subscription_id,
        stripe_invoice_id,
        start_timestamp,
        end_timestamp
      )
      VALUES (
        ${userId},
        ${stripeSubscriptionId},
        ${invoice.id},
        to_timestamp(${invoice.lines.data[0].period.start}),
        to_timestamp(${invoice.lines.data[0].period.end})
      )
    `;
    console.log('Subscription record created successfully');
    return { status: 200, message: 'Subscription record created' };
  } catch (err) {
    console.error('Error inserting subscription record:', err);
    return { status: 500, message: 'Internal Server Error' };
  }
}
