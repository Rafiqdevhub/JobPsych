import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { shouldApplyRateLimits } from "@utils/env";
import Footer from "@components/layout/Footer";
import HeroSection from "@components/hero/HeroSection";
import FeaturesSection from "@components/features/FeaturesSection";
import PricingSection from "@components/pricing/PricingSection";
import FAQSection from "@components/faq/FAQSection";
import TestimonialsSection from "@components/testimonials/TestimonialsSection";
import Header from "@components/layout/Header";

const LandingPage = () => {
  const { isSignedIn } = useUser();
  const [uploadCount, setUploadCount] = useState(0);

  useEffect(() => {
    if (!isSignedIn) {
      const storedCount = localStorage.getItem("resumeUploadCount");
      if (storedCount) {
        setUploadCount(parseInt(storedCount));
      }
    } else {
      const redirectAfterAuth = localStorage.getItem("redirectAfterAuth");
      const selectedPlan = localStorage.getItem("selectedPlan");

      if (redirectAfterAuth === "payment" && selectedPlan) {
        localStorage.removeItem("redirectAfterAuth");
        window.location.href = `/payment?plan=${selectedPlan}`;
      } else if (redirectAfterAuth === "pricing" && selectedPlan) {
        localStorage.removeItem("redirectAfterAuth");
        window.location.href = `/payment?plan=${selectedPlan}`;
      }
    }
  }, [isSignedIn]);

  const getDestination = () => {
    if (!shouldApplyRateLimits()) {
      return "/hire-disk";
    }

    if (isSignedIn) {
      return "/hire-disk";
    }

    if (uploadCount >= 2) {
      return "/sign-up";
    } else {
      return "/";
    }
  };

  const handlePlanSelection = (planId) => {
    const normalizedPlanId = planId.toLowerCase();

    if (
      normalizedPlanId === "free" ||
      normalizedPlanId === "role suggestions"
    ) {
      window.location.href = "/role-suggestions";
    } else if (
      normalizedPlanId === "interviewprep" ||
      normalizedPlanId === "interviewprep ai"
    ) {
      window.location.href = "/interview-prep-ai";
    } else if (
      normalizedPlanId === "ats" ||
      normalizedPlanId === "ats-analyzer" ||
      normalizedPlanId === "ats analyzer"
    ) {
      window.location.href = "/ats-analyzer";
    } else if (normalizedPlanId === "pro" || normalizedPlanId === "hiredisk") {
      if (!isSignedIn) {
        localStorage.setItem("selectedPlan", "pro");
        localStorage.setItem("redirectAfterAuth", "payment");
        window.location.href = "/sign-up";
      } else {
        const userPlan = localStorage.getItem("userPlan");
        if (userPlan === "pro") {
          window.location.href = "/hire-disk";
        } else {
          localStorage.setItem("selectedPlan", "pro");
          window.location.href = `/payment?plan=pro`;
        }
      }
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
      <HeroSection
        isSignedIn={isSignedIn}
        handlePlanSelection={handlePlanSelection}
        shouldApplyRateLimits={shouldApplyRateLimits}
      />
      <FeaturesSection />
      <PricingSection
        pricingRef={pricingRef}
        handlePlanSelection={handlePlanSelection}
      />
      <FAQSection />
      <TestimonialsSection />
      <Footer getDestination={getDestination} />
    </div>
  );
};

export default LandingPage;
