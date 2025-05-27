import { auth } from "@/app/lib/auth";
import { NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: any, res: any) {
    // セッションチェック
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      );
    }
    
    if (req.method === 'POST') {
        const email = req.body?.email;
        const userId = req.body?.userId;

        if (!email || !userId) {
            res.status(403).end('email or userId is required');
            return;
        }

        try {
            // 顧客を作成または既存の顧客を検索
            const customer = await stripe.customers.list({
                email,
            }).then((customers: any) => {
                if (customers.data.length) {
                    return customers.data[0];
                }
                return stripe.customers.create({
                    email,
                    metadata: {
                        userId: userId,
                    },
                });
            });

            const session = await stripe.checkout.sessions.create({
                customer: customer.id, // 顧客IDをセッションに紐付け
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: "prod_S3xe0Ydvdp5Uhp",
                        quantity: 1,
                    },
                ],
                billing_address_collection: 'required',
                mode: 'subscription',
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            });
            res.redirect(303, session.url);
        } catch (err: any) {
            res.status(500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}