import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useUser } from "@clerk/clerk-react";
import Header from "./Header";
import NavigationButton from "./NavigationButton";
import { shouldApplyRateLimits } from "../utils/env";

const LandingPage = () => {
  const { isSignedIn } = useUser();
  const [uploadCount, setUploadCount] = useState(0);
  const [isAnnual, setIsAnnual] = useState(false);

  const enhancedPlans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: 0, annual: 0 },
      highlight: "Most Popular",
      features: [
        "2 Resume analyses per month",
        "Basic interview questions",
        "Standard AI insights",
        "Email support",
        "Basic candidate reports",
      ],
      limitations: [
        "Limited to 2 uploads per month",
        "Basic question templates only",
        "Standard processing speed",
      ],
      buttonText: "Start Free",
      buttonStyle:
        "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700",
      popular: true,
    },
    {
      name: "Pro",
      description: "For growing teams and HR professionals",
      price: { monthly: 49, annual: 39 },
      highlight: "Best Value",
      features: [
        "Unlimited resume analyses",
        "Advanced AI-powered questions",
        "Deep candidate insights",
        "Skills gap analysis",
        "Priority email support",
        "Advanced analytics dashboard",
        "Custom question templates",
        "Export reports to PDF/Excel",
        "Team collaboration tools",
      ],
      limitations: [],
      buttonText: "Start Pro Trial",
      buttonStyle:
        "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700",
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "How does the free plan work?",
      answer:
        "The free plan allows you to analyze up to 2 resumes per IP address with basic AI insights and interview questions. Perfect for trying out JobPsych's capabilities.",
    },
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal for convenient billing.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use enterprise-grade security with encryption at rest and in transit. All data is stored securely and never shared with third parties.",
    },
  ];

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
    if (planId === "free") {
      window.location.href = "/dashboard";
    } else {
      if (!isSignedIn) {
        localStorage.setItem("selectedPlan", planId);
        localStorage.setItem("redirectAfterAuth", "payment");
        window.location.href = "/sign-up";
      } else {
        const userPlan = localStorage.getItem("userPlan");
        if (userPlan === "pro") {
          window.location.href = "/premium-dashboard";
        } else {
          localStorage.setItem("selectedPlan", planId);
          window.location.href = `/payment?plan=${planId}`;
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header />
      <section id="hero" className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-medium mb-8">
              <span className="mr-2">🚀</span>
              AI-Powered Hiring Intelligence
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              AI-Powered Resume Screening for Smarter Hiring Decisions
            </h1>

            <p className="mt-6 text-xl md:text-2xl leading-relaxed text-gray-600 max-w-3xl mx-auto">
              <span className="font-semibold text-indigo-600">
                JobPsych reads between the lines
              </span>{" "}
              so you don't have to. Analyze resumes, spot top talent, and make
              confident hiring calls in minutes.
            </p>

            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-inner border border-indigo-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">⚡</span>
                  <span className="font-medium">Instant Analysis</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">🎯</span>
                  <span className="font-medium">Spot Top Talent</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">🧠</span>
                  <span className="font-medium">AI-Powered Insights</span>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handlePlanSelection("free")}
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 border-none cursor-pointer"
              >
                <span className="text-lg">✅</span>
                <span className="relative z-10">
                  Try It for Free - 2 Analyses
                </span>
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {shouldApplyRateLimits() && !isSignedIn && (
                  <span
                    className={`absolute -top-3 -right-3 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ${
                      uploadCount >= 2 ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {uploadCount >= 2
                      ? "Limit reached"
                      : `${2 - uploadCount} free left`}
                  </span>
                )}
              </button>

              <button
                onClick={() => handlePlanSelection("pro")}
                className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 border-none cursor-pointer"
              >
                <span className="text-lg">🔒</span>
                <span className="relative z-10">
                  Go Pro – Get 20 Resume Scans/Month
                </span>
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <div className="mt-6 space-y-2">
              {shouldApplyRateLimits() && !isSignedIn && (
                <p className="text-sm text-indigo-700 font-medium bg-indigo-50 px-4 py-2 rounded-lg inline-block">
                  {uploadCount >= 2
                    ? "🎯 You've used all free uploads. Sign up to continue with 2 more free analyses."
                    : `💡 Free users get 2 resume analyses. ${
                        uploadCount > 0
                          ? `${uploadCount} used, ${2 - uploadCount} remaining.`
                          : "Start your first analysis now!"
                      }`}
                </p>
              )}

              {isSignedIn && (
                <p className="text-sm text-emerald-700 font-medium bg-emerald-50 px-4 py-2 rounded-lg inline-block">
                  🎉 Welcome back! You have additional free uploads available.
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Bank-Level Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </section>
      <section
        id="features"
        className="py-24 sm:py-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-medium mb-6">
              <span className="mr-2">🚀</span>
              Powerful Features for Modern Hiring
            </div>

            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Everything You Need for
              <br />
              <span className="text-indigo-600">Smart Hiring</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              JobPsych combines AI-powered analysis with intuitive design to
              revolutionize your hiring process. Discover how our features can
              transform your candidate evaluation workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  🧠
                </div>

                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-medium mb-4">
                  Smart Analysis
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  AI-Powered Resume Analysis
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Advanced AI algorithms analyze resumes to extract key skills,
                  experience, and qualifications automatically.
                </p>
              </div>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  ❓
                </div>

                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-medium mb-4">
                  Personalized Questions
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  Dynamic Interview Questions
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Generate personalized interview questions based on specific
                  job roles and candidate backgrounds.
                </p>
              </div>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  📊
                </div>

                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-medium mb-4">
                  Deep Insights
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  Candidate Insights
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Get comprehensive insights about candidate strengths,
                  weaknesses, and cultural fit assessments.
                </p>
              </div>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  ⚡
                </div>

                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-medium mb-4">
                  Lightning Fast
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  Real-time Processing
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Upload resumes and receive instant analysis results within
                  seconds, not hours.
                </p>
              </div>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  🎯
                </div>

                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-medium mb-4">
                  Strategic Hiring
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  Skills Gap Analysis
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Identify skill gaps and areas for improvement to make better
                  hiring decisions.
                </p>
              </div>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  🔐
                </div>

                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-medium mb-4">
                  Bank-level Security
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  Secure & Private
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Enterprise-grade security ensures all candidate data is
                  protected with advanced encryption.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-8">
              How JobPsych Works
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📄</span>
                </div>
                <h4 className="font-semibold mb-2">1. Upload Resume</h4>
                <p className="text-white/90 text-sm">
                  Simply upload a candidate's resume in PDF or Word format
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h4 className="font-semibold mb-2">2. AI Analysis</h4>
                <p className="text-white/90 text-sm">
                  Our AI extracts key information, skills, and experience
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❓</span>
                </div>
                <h4 className="font-semibold mb-2">3. Generate Questions</h4>
                <p className="text-white/90 text-sm">
                  Receive tailored interview questions based on the candidate's
                  background
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold mb-2">4. Better Interviews</h4>
                <p className="text-white/90 text-sm">
                  Use our insights to focus on what matters for each role
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-purple-200/20 to-blue-200/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-xl"></div>
        </div>
      </section>

      <section
        id="pricing"
        className="py-24 sm:py-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 uppercase tracking-wide">
              ✨ Flexible Plans
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Choose the Perfect Plan for Your Team
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Start with our free trial to experience JobPsych instantly, then
              upgrade to Pro for unlimited access and advanced features.
            </p>

            <div className="mt-8 flex justify-center items-center space-x-4">
              <span
                className={`text-sm font-medium ${
                  !isAnnual ? "text-indigo-600" : "text-gray-500"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  isAnnual ? "bg-indigo-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium ${
                  isAnnual ? "text-indigo-600" : "text-gray-500"
                }`}
              >
                Annual
                <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </span>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-2">
            {enhancedPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-3xl p-8 shadow-2xl ring-1 ring-gray-200 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl ${
                  plan.popular
                    ? "bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white scale-105"
                    : "bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-indigo-50"
                }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: "fadeInUp 0.8s ease-out forwards",
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-0 right-0 mx-auto w-40 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-center text-sm font-bold text-white shadow-lg">
                    🚀 {plan.highlight}
                  </div>
                )}

                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      plan.popular ? "bg-white/20" : "bg-indigo-100"
                    }`}
                  >
                    {plan.name === "Free" ? (
                      <svg
                        className={`h-6 w-6 ${
                          plan.popular ? "text-white" : "text-indigo-600"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    ) : plan.name === "Pro" ? (
                      <svg
                        className={`h-6 w-6 ${
                          plan.popular ? "text-white" : "text-indigo-600"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className={`h-6 w-6 ${
                          plan.popular ? "text-white" : "text-indigo-600"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    )}
                  </div>
                  <h3
                    className={`text-2xl font-bold ${
                      plan.popular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span
                      className={`text-5xl font-extrabold tracking-tight ${
                        plan.popular ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {typeof plan.price.monthly === "number"
                        ? `$${
                            isAnnual ? plan.price.annual : plan.price.monthly
                          }`
                        : plan.price.monthly}
                    </span>
                    {typeof plan.price.monthly === "number" && (
                      <span
                        className={`ml-1 text-xl font-semibold ${
                          plan.popular ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        /{isAnnual ? "year" : "month"}
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-4 text-lg ${
                      plan.popular ? "text-white/90" : "text-gray-600"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <button
                  onClick={() => handlePlanSelection(plan.name.toLowerCase())}
                  className={`mb-8 w-full rounded-xl px-6 py-4 text-center text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer border-none ${
                    plan.popular
                      ? "bg-white text-indigo-600 hover:bg-gray-100"
                      : plan.buttonStyle
                  }`}
                >
                  {plan.buttonText}
                </button>

                <ul className="space-y-4 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <div
                        className={`flex-shrink-0 mt-1 p-1 rounded-full ${
                          plan.popular ? "bg-white/20" : "bg-indigo-100"
                        }`}
                      >
                        <svg
                          className={`h-4 w-4 ${
                            plan.popular ? "text-white" : "text-indigo-600"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span
                        className={`text-base ${
                          plan.popular ? "text-white/90" : "text-gray-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.name === "Free" && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🎯</span>
                      <span className="text-sm font-semibold text-blue-800">
                        Perfect for Testing JobPsych
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-blue-700">
                      Try 2 resume analyses instantly - no account creation
                      needed!
                    </p>
                  </div>
                )}

                {plan.name === "Pro" && !plan.popular && (
                  <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">💼</span>
                      <span className="text-sm font-semibold text-indigo-800">
                        For HR Teams & Hiring Managers
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-indigo-700">
                      Unlimited analyses, advanced AI features, and team
                      collaboration tools.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-24">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h3>
              <p className="text-lg text-gray-600">
                Everything you need to know about JobPsych and our pricing
                plans.
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-12">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                JobPsych
              </h3>
              <p className="text-gray-400 text-sm">
                The AI-powered platform that transforms how HR teams conduct
                interviews. Extract valuable insights from resumes and generate
                personalized interview questions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Key Features
              </h3>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li>• AI Resume Analysis</li>
                <li>• Custom Interview Questions</li>
                <li>• Skills Assessment</li>
                <li>• Candidate Insights</li>
                <li>• Secure & Private</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Get Started
              </h3>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li>
                  •{" "}
                  <NavigationButton
                    to={getDestination()}
                    className="hover:text-indigo-300 bg-transparent border-none p-0 cursor-pointer text-gray-400 font-inherit"
                  >
                    Upload Resume
                  </NavigationButton>
                </li>
                <li>
                  •{" "}
                  <NavigationButton
                    to="/sign-up"
                    className="hover:text-indigo-300 bg-transparent border-none p-0 cursor-pointer text-gray-400 font-inherit"
                  >
                    Create Account
                  </NavigationButton>
                </li>
                <li>
                  •{" "}
                  <button
                    onClick={() => {
                      document
                        .getElementById("features")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-indigo-300 bg-transparent border-none p-0 cursor-pointer text-gray-400 font-inherit"
                  >
                    Learn More
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-xs leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} JobPsych. All rights reserved.
              Your data is always secure and private.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
