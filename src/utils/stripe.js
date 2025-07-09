import { loadStripe } from "@stripe/stripe-js";

// Get the Stripe publishable key from environment variables
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.error(
    "Stripe publishable key is missing. Please set VITE_STRIPE_PUBLISHABLE_KEY in your .env file."
  );
}

// Initialize Stripe with the publishable key
const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : Promise.reject(new Error("Stripe publishable key is missing"));

export default stripePromise;
