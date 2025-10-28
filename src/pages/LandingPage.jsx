import React from "react";
import Footer from "@components/layout/Footer";
import HeroSection from "@components/hero/HeroSection";
import FeaturesSection from "@components/features/FeaturesSection";
import FAQSection from "@components/faq/FAQSection";
import TestimonialsSection from "@components/testimonials/TestimonialsSection";
import Header from "@components/layout/Header";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <FAQSection />
      <TestimonialsSection />

      <Footer />
    </div>
  );
};

export default LandingPage;
