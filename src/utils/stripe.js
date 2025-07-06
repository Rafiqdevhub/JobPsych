import { loadStripe } from "@stripe/stripe-js";

// Replace with your actual Stripe publishable key
// This would typically come from an environment variable
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder"
);

export default stripePromise;
