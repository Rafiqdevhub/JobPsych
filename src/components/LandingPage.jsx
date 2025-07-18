import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useUser } from "@clerk/clerk-react";
import Header from "./Header";
import NavigationButton from "./NavigationButton";
import { shouldApplyRateLimits } from "../utils/env";

const LandingPage = () => {
  const { isSignedIn } = useUser();
  const [uploadCount, setUploadCount] = useState(0);

  const enhancedPlans = [
    {
      name: "Role Suggestions",
      description: "Free career guidance for job seekers",
      price: { monthly: 0, annual: 0 },
      highlight: "100% Free",
      features: [
        "Unlimited resume analysis",
        "Target role specification",
        "Job description matching",
        "Role fit assessment",
        "Career recommendations",
        "Alternative role suggestions",
        "Instant results",
      ],
      limitations: [],
      buttonText: "Start Free Analysis",
      buttonStyle:
        "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700",
      popular: true,
    },
    {
      name: "HireDisk",
      description: "Advanced AI hiring intelligence for HR teams",
      price: { monthly: 50 },
      highlight: "For HR Teams",
      features: [
        "Everything in Role Suggestions",
        "Advanced AI-powered screening",
        "Dynamic interview questions",
        "Deep candidate insights",
        "Skills assessment reports",
        "Advanced analytics dashboard",
      ],
      limitations: [],
      buttonText: "Start HireDisk Trial",
      buttonStyle:
        "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700",
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "What's the difference between Role Suggestions and HireDisk?",
      answer:
        "Role Suggestions is completely free for job seekers to get career guidance and role recommendations. HireDisk is a premium AI hiring tool designed for HR teams with advanced features like interview question generation and candidate screening.",
    },
    {
      question: "Is Role Suggestions really completely free?",
      answer:
        "Yes! Role Suggestions is 100% free with unlimited usage. Upload your resume, specify target roles, and get personalized career recommendations without any limits or hidden fees.",
    },
    {
      question: "What payment methods do you accept for HireDisk Pro?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal for convenient billing of HireDisk Pro subscriptions.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use enterprise-grade security with encryption at rest and in transit. All data is stored securely and never shared with third parties, whether you use Role Suggestions or HireDisk.",
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

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  const contactRef = React.useRef(null);

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header scrollToContact={scrollToContact} />
      <section id="hero" className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-medium mb-8">
              <span className="mr-2">🚀</span>
              Career Guidance & Hiring Intelligence
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Smart Career Guidance & AI-Powered Hiring Solutions
            </h1>

            <p className="mt-6 text-xl md:text-2xl leading-relaxed text-gray-600 max-w-3xl mx-auto">
              <span className="font-semibold text-indigo-600">
                JobPsych offers two powerful tools:
              </span>{" "}
              Free career role suggestions for job seekers and premium
              AI-powered hiring intelligence for HR teams.
            </p>

            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-inner border border-indigo-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                <div className="text-center p-4 bg-white/60 rounded-xl border border-indigo-200">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-lg">✅</span>
                    <span className="font-medium text-indigo-600">
                      Role Suggestions
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Free career guidance for job seekers
                  </p>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-xl border border-emerald-200">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-lg">🔒</span>
                    <span className="font-medium text-emerald-600">
                      HireDisk
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Premium AI hiring intelligence
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handlePlanSelection("free")}
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 border-none cursor-pointer"
              >
                <span className="text-lg">✅</span>
                <span className="relative z-10">Role Suggestions</span>
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {shouldApplyRateLimits() && !isSignedIn && (
                  <span className="absolute -top-3 -right-3 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg bg-green-500">
                    FREE
                  </span>
                )}
              </button>

              <button
                onClick={() => handlePlanSelection("pro")}
                className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 border-none cursor-pointer"
              >
                <span className="text-lg">🔒</span>
                <span className="relative z-10">HireDisk</span>
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute -top-3 -right-3 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg bg-orange-500">
                  PRO
                </span>
              </button>
            </div>

            <div className="mt-6 space-y-2">
              <p className="text-sm text-indigo-700 font-medium bg-indigo-50 px-4 py-2 rounded-lg inline-block">
                ✅ <strong>Role Suggestions:</strong> Completely FREE - Upload
                your resume, mention target role & get career recommendations
              </p>
              <p className="text-sm text-emerald-700 font-medium bg-emerald-50 px-4 py-2 rounded-lg inline-block">
                🔒 <strong>HireDisk:</strong> Premium AI hiring tool for HR
                teams and recruiters
              </p>
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
              Two Powerful Tools for
              <br />
              <span className="text-indigo-600">
                Career Success & Smart Hiring
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              JobPsych provides free career guidance for job seekers through
              Role Suggestions, and premium AI-powered hiring intelligence for
              HR teams through HireDisk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  ✅
                </div>

                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-medium mb-4">
                  Role Suggestions
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  Free Career Guidance
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Upload your resume, mention target role & job description to
                  get personalized career recommendations - completely free!
                </p>
              </div>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  �
                </div>

                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-medium mb-4">
                  HireDisk Premium
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                  AI-Powered Hiring Tool
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Advanced AI resume screening, candidate insights, and
                  interview question generation for HR teams and recruiters.
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
                  Smart Analysis
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  Role Fit Assessment
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Get detailed analysis of how well you match specific roles
                  with skill gap identification and improvement suggestions.
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
                  Instant Results
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  Real-time Processing
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Upload resumes and receive instant analysis results within
                  seconds for both career guidance and hiring decisions.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-8">
              How JobPsych Works
            </h3>
            <div className="mb-8 max-w-4xl mx-auto text-lg text-white/90 text-center">
              <p className="mb-2">
                <span className="font-bold text-yellow-200">
                  Role Suggestions
                </span>{" "}
                is{" "}
                <span className="font-bold text-green-300">
                  completely free
                </span>{" "}
                for job seekers. Just upload your resume and get instant career
                recommendations and role fit analysis—no payment or signup
                required!
              </p>
              <p className="mb-2">
                <span className="font-bold text-emerald-200">HireDisk</span> is
                our premium AI hiring tool for HR teams and recruiters, with two
                plans:
              </p>
              <ul className="mb-2 list-none flex flex-col md:flex-row justify-center gap-4">
                <li className="bg-emerald-600/80 rounded-xl px-4 py-2 inline-flex items-center gap-2 text-white font-semibold shadow">
                  <span className="text-orange-200 text-xl">Pro</span>
                  <span className="bg-white/20 rounded px-2 py-1 text-sm font-bold">
                    $50/mo
                  </span>
                  <span className="hidden md:inline">— For small HR teams</span>
                </li>
                <li className="bg-yellow-500/80 rounded-xl px-4 py-2 inline-flex items-center gap-2 text-white font-semibold shadow">
                  <span className="text-yellow-100 text-xl">Premium</span>
                  <span className="bg-white/20 rounded px-2 py-1 text-sm font-bold">
                    Contact Us
                  </span>
                  <span className="hidden md:inline">
                    — For enterprises & custom needs
                  </span>
                </li>
              </ul>
              <p className="mt-2">
                <span className="font-bold">How to choose?</span> If you're a
                job seeker, use{" "}
                <span className="text-yellow-200 font-bold">
                  Role Suggestions
                </span>{" "}
                for free. If you're an HR team or recruiter, start with{" "}
                <span className="text-orange-200 font-bold">HireDisk Pro</span>{" "}
                for $50/month, or{" "}
                <button
                  type="button"
                  className="text-yellow-100 font-bold underline hover:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-colors"
                >
                  contact us
                </button>{" "}
                for a custom Premium plan.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Role Suggestions Flow */}
              <div className="bg-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-6 text-yellow-300">
                  ✅ Role Suggestions (FREE)
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <span className="text-white/90">Upload your resume</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <span className="text-white/90">
                      Mention target role & job description
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <span className="text-white/90">
                      Get career recommendations & role fit analysis
                    </span>
                  </div>
                  <div className="mt-4 text-green-200 text-sm font-semibold">
                    <span className="bg-green-700/60 rounded px-2 py-1">
                      Completely Free
                    </span>
                  </div>
                </div>
              </div>

              {/* HireDisk Flow */}
              <div className="bg-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-6 text-emerald-300">
                  🔒 HireDisk (Pro & Premium)
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <span className="text-white/90">
                      AI-powered resume screening
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <span className="text-white/90">
                      Generate interview questions
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <span className="text-white/90">
                      Advanced candidate insights & analytics
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <span className="bg-orange-500/80 rounded px-2 py-1 text-white text-sm font-semibold inline-block">
                      Pro: $50/month
                    </span>
                    <span className="bg-yellow-500/80 rounded px-2 py-1 text-white text-sm font-semibold inline-block">
                      Premium: Contact Us
                    </span>
                  </div>
                </div>
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
              Choose Role Suggestions for free career guidance or upgrade to
              HireDisk Pro for advanced AI-powered hiring intelligence and
              unlimited features.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
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
                    <span className="text-2xl">
                      {plan.name === "Role Suggestions" ? "✅" : "🔒"}
                    </span>
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
                        ? `$${plan.price.monthly}`
                        : plan.price.monthly}
                    </span>
                    {typeof plan.price.monthly === "number" && (
                      <span
                        className={`ml-1 text-xl font-semibold ${
                          plan.popular ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        /month
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
                {plan.name === "Role Suggestions" && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">✅</span>
                      <span className="text-sm font-semibold text-blue-800">
                        Perfect for Job Seekers
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-blue-700">
                      Get unlimited career guidance and role recommendations -
                      completely free!
                    </p>
                  </div>
                )}
                {plan.name === "HireDisk" && !plan.popular && (
                  <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🔒</span>
                      <span className="text-sm font-semibold text-indigo-800">
                        For HR Teams & Recruiters
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-indigo-700">
                      Advanced AI hiring intelligence with interview questions
                      and candidate insights.
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div className="relative flex flex-col rounded-3xl p-8 shadow-2xl ring-1 ring-gray-200 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 text-white scale-105">
              <div className="absolute -top-5 left-0 right-0 mx-auto w-40 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-center text-sm font-bold text-white shadow-lg">
                🌟 Premium
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-full bg-white/20">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Premium</h3>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight text-white">
                    Custom
                  </span>
                </div>
                <p className="mt-4 text-lg text-white/90">
                  Enterprise-grade AI hiring solutions, custom integrations, and
                  dedicated support. Contact us for pricing and access.
                </p>
              </div>
              <button
                onClick={scrollToContact}
                className="mb-8 w-full rounded-xl px-6 py-4 text-center text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer border-none bg-white text-yellow-600 hover:bg-gray-100"
              >
                Contact Us
              </button>
              <ul className="space-y-4 flex-1">
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1 p-1 rounded-full bg-white/20">
                    <svg
                      className="h-4 w-4 text-white"
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
                  <span className="text-base text-white/90">
                    Custom AI solutions
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1 p-1 rounded-full bg-white/20">
                    <svg
                      className="h-4 w-4 text-white"
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
                  <span className="text-base text-white/90">
                    Dedicated support
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1 p-1 rounded-full bg-white/20">
                    <svg
                      className="h-4 w-4 text-white"
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
                  <span className="text-base text-white/90">
                    Custom integrations
                  </span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">💎</span>
                  <span className="text-sm font-semibold text-white">
                    For Enterprises & Large Teams
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/80">
                  Contact us for a tailored solution and pricing.
                </p>
              </div>
            </div>
          </div>{" "}
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
          {/* Modern Contact Section (inline form) */}
          <div
            ref={contactRef}
            id="contact"
            className="mt-24 mx-auto max-w-3xl"
          >
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-emerald-500 rounded-3xl shadow-2xl p-10 text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-yellow-200/40 to-pink-200/10 rounded-full blur-2xl opacity-60 -z-10" />
              <div className="absolute left-0 bottom-0 w-40 h-40 bg-gradient-to-tr from-emerald-200/40 to-teal-200/10 rounded-full blur-2xl opacity-60 -z-10" />
              <div className="flex flex-col items-center justify-center gap-6">
                <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-lg">
                  Get in Touch With Us
                </h3>
                <p className="text-lg text-white/90 mb-4 max-w-xl text-center">
                  Have questions, need a custom solution, or want to learn more
                  about JobPsych Premium? Our team is here to help you succeed.
                  Fill out the contact form and we'll get back to you as soon as
                  possible.
                </p>
                <div className="w-full max-w-lg mx-auto">
                  {contactSubmitted ? (
                    <div className="text-green-200 text-center font-semibold py-8 text-xl bg-white/10 rounded-2xl shadow-inner">
                      Thank you! We'll contact you soon.
                    </div>
                  ) : (
                    <form
                      onSubmit={handleContactSubmit}
                      className="space-y-5 bg-white/10 rounded-2xl p-8 shadow-xl"
                    >
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={contactForm.name}
                          onChange={handleContactChange}
                          required
                          className="w-full rounded-lg border border-white/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/80 text-gray-900 placeholder-gray-400"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={contactForm.email}
                          onChange={handleContactChange}
                          required
                          className="w-full rounded-lg border border-white/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/80 text-gray-900 placeholder-gray-400"
                          placeholder="you@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-1">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={contactForm.message}
                          onChange={handleContactChange}
                          required
                          rows={4}
                          className="w-full rounded-lg border border-white/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/80 text-gray-900 placeholder-gray-400"
                          placeholder="Tell us about your needs..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 rounded-lg shadow hover:from-yellow-500 hover:to-orange-600 transition-all cursor-pointer text-lg"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
                <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="flex items-center gap-2 text-white/80">
                    <svg
                      className="h-5 w-5 text-yellow-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12v1a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4h4a4 4 0 014 4v1"
                      />
                    </svg>
                    <span>Custom AI Solutions</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <svg
                      className="h-5 w-5 text-emerald-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3"
                      />
                    </svg>
                    <span>Dedicated Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <svg
                      className="h-5 w-5 text-indigo-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h8"
                      />
                    </svg>
                    <span>Enterprise Integrations</span>
                  </div>
                </div>
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
                Two powerful tools in one platform: Free career guidance through
                Role Suggestions and premium AI hiring intelligence through
                HireDisk for HR teams.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Key Features
              </h3>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li>• Free Career Guidance</li>
                <li>• Role Fit Assessment</li>
                <li>• AI Resume Analysis</li>
                <li>• Interview Questions (Pro)</li>
                <li>• Candidate Insights (Pro)</li>
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
                    Try Role Suggestions
                  </NavigationButton>
                </li>
                <li>
                  •{" "}
                  <NavigationButton
                    to="/sign-up"
                    className="hover:text-indigo-300 bg-transparent border-none p-0 cursor-pointer text-gray-400 font-inherit"
                  >
                    Get HireDisk Pro
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
