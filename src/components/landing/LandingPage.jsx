import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { shouldApplyRateLimits } from "../../utils/env";
import Footer from "../layout/Footer";
import HeroSection from "../hero/HeroSection";
import FeaturesSection from "../features/FeaturesSection";
import PricingSection from "../pricing/PricingSection";
import Header from "../layout/Header";

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
      return "/dashboard";
    }

    if (isSignedIn) {
      return "/dashboard";
    }

    if (uploadCount >= 2) {
      return "/sign-up";
    } else {
      return "/dashboard";
    }
  };

  const handlePlanSelection = (planId) => {
    const normalizedPlanId = planId.toLowerCase();

    if (
      normalizedPlanId === "free" ||
      normalizedPlanId === "role suggestions"
    ) {
      window.location.href = "/dashboard";
    } else if (normalizedPlanId === "pro" || normalizedPlanId === "hiredisk") {
      if (!isSignedIn) {
        localStorage.setItem("selectedPlan", "pro");
        localStorage.setItem("redirectAfterAuth", "payment");
        window.location.href = "/sign-up";
      } else {
        const userPlan = localStorage.getItem("userPlan");
        if (userPlan === "pro") {
          window.location.href = "/premium-dashboard";
        } else {
          localStorage.setItem("selectedPlan", "pro");
          window.location.href = `/payment?plan=pro`;
        }
      }
    }
  };

  const contactRef = React.useRef(null);
  const pricingRef = React.useRef(null);

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        scrollToContact={scrollToContact}
        handlePlanSelection={handlePlanSelection}
      />

      <Footer getDestination={getDestination} />
    </div>
  );
};

export default LandingPage;
