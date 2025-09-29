import React, { useEffect, useState } from "react";

import Footer from "@components/layout/Footer";
import HeroSection from "@components/hero/HeroSection";
import FeaturesSection from "@components/features/FeaturesSection";
import FAQSection from "@components/faq/FAQSection";
import TestimonialsSection from "@components/testimonials/TestimonialsSection";
import Header from "@components/layout/Header";

const LandingPage = () => {
  const [setUploadCount] = useState(0);

  useEffect(() => {
    const storedCount = localStorage.getItem("resumeUploadCount");
    if (storedCount) {
      setUploadCount(parseInt(storedCount));
    }
  }, []);

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
      <Footer />
    </div>
  );
};

export default LandingPage;
