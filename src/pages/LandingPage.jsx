import React from "react";

import Footer from "@components/layout/Footer";
import HeroSection from "@components/hero/HeroSection";
import FeaturesSection from "@components/features/FeaturesSection";
import FAQSection from "@components/faq/FAQSection";
import TestimonialsSection from "@components/testimonials/TestimonialsSection";
import Header from "@components/layout/Header";

const LandingPage = () => {
  const pricingRef = React.useRef(null);

  const scrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header scrollToPricing={scrollToPricing} />
      <HeroSection />
      <FeaturesSection />
      <FAQSection />
      <TestimonialsSection />
      <div ref={pricingRef} data-testid="pricing-section">
        {/* Pricing section would go here */}
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
