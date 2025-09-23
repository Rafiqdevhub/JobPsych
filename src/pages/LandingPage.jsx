import React, { useEffect, useState } from "react";
import { shouldApplyRateLimits } from "@utils/env";
import Footer from "@components/layout/Footer";
import HeroSection from "@components/hero/HeroSection";
import FeaturesSection from "@components/features/FeaturesSection";
import FAQSection from "@components/faq/FAQSection";
import TestimonialsSection from "@components/testimonials/TestimonialsSection";
import Header from "@components/layout/Header";

const LandingPage = () => {
  const [uploadCount, setUploadCount] = useState(0);

  useEffect(() => {
    const storedCount = localStorage.getItem("resumeUploadCount");
    if (storedCount) {
      setUploadCount(parseInt(storedCount));
    }
  }, []);

  const getDestination = () => {
    if (!shouldApplyRateLimits()) {
      return "/hire-disk";
    }

    if (uploadCount >= 2) {
      // Redirect to a custom auth modal or payment page instead of sign-up
      return "/payment";
    } else {
      return "/";
    }
  };

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
      <Footer getDestination={getDestination} />
    </div>
  );
};

export default LandingPage;
