import { loadStripe } from "@stripe/stripe-js";

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.error(
    "Stripe publishable key is missing. Please set VITE_STRIPE_PUBLISHABLE_KEY in your .env file."
  );
}

const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : Promise.reject(new Error("Stripe publishable key is missing"));

export default stripePromise;
