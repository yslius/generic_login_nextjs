const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const email = req.body?.email;

        if (!email) {
            res.status(403).end('email is required');
            return;
        }

        // 顧客を検索
        const customers = await stripe.customers.list({
            email,
        });
        let customer;
        if (customers.data.length) {
            customer = customers.data[0];
        } else {
            res.status(403).end('customer not found');
            return;
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: customer.id,
            return_url: `${req.headers.origin}/?return=true`,
        });

        res.redirect(303, session.url);
    }
}