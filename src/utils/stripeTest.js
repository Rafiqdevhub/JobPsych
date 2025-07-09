// Test file to verify Stripe configuration
// This can be temporarily imported in PaymentPage.jsx for debugging

export const testStripeConfiguration = async () => {
  try {
    // Test environment variables
    const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    console.log("Stripe Key Present:", !!stripeKey);
    console.log("Stripe Key Prefix:", stripeKey?.substring(0, 10));

    // Test Stripe loading
    const { loadStripe } = await import("@stripe/stripe-js");
    const stripe = await loadStripe(stripeKey);
    console.log("Stripe Loaded:", !!stripe);

    return {
      keyPresent: !!stripeKey,
      stripeLoaded: !!stripe,
      keyPrefix: stripeKey?.substring(0, 10),
    };
  } catch (error) {
    console.error("Stripe test failed:", error);
    return {
      error: error.message,
      keyPresent: false,
      stripeLoaded: false,
    };
  }
};
