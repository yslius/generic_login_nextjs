import { loadStripe } from "@stripe/stripe-js";

const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(key);

const App = () => {
    return (
        <form action="/api/portal" method="POST">
            <section>
                <input type="hidden" name="email" value="user-example@gmail.com" />
                <input type="hidden" name="userId" value="123" />
                <button type="submit" role="link">
                    Stripeのユーザー画面へ
                </button>
            </section>
        </form>
    );
};

export default App;