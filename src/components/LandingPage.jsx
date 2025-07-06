import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useUser } from "@clerk/clerk-react";
import Header from "./Header";
import NavigationButton from "./NavigationButton";
import { shouldApplyRateLimits } from "../utils/env";
import PricingModal from "./PricingModal";

const LandingPage = () => {
  const { isSignedIn } = useUser();
  const [uploadCount, setUploadCount] = useState(0);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (!isSignedIn) {
      const storedCount = localStorage.getItem("resumeUploadCount");
      if (storedCount) {
        setUploadCount(parseInt(storedCount));
      }
    }
  }, [isSignedIn]);

  const getDestination = () => {
    if (isSignedIn || !shouldApplyRateLimits()) {
      return "/dashboard";
    } else if (uploadCount >= 2) {
      return "/sign-up";
    } else {
      return "/dashboard";
    }
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    setShowPricingModal(false);

    // Store the selected plan in localStorage for use after authentication
    localStorage.setItem("selectedPlan", planId);

    // Free plan just needs authentication if not signed in
    if (planId === "free") {
      if (!isSignedIn) {
        window.location.href = "/sign-up";
      } else {
        window.location.href = "/dashboard";
      }
    } else {
      // For paid plans, redirect to auth if not signed in
      if (!isSignedIn) {
        // Store a flag to redirect to payment flow after authentication
        localStorage.setItem("redirectToPayment", "true");
        window.location.href = "/sign-up";
      } else {
        // If signed in, redirect to payment processing page
        window.location.href = `/payment?plan=${planId}`;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header />
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              JobPsych
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Optimize your job interviews with AI-powered resume analysis and
              personalized interview questions.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-700 bg-indigo-50 p-4 rounded-lg shadow-inner">
              <span className="font-semibold text-indigo-600">JobPsych</span> is
              designed for HR professionals and hiring managers to streamline
              the interview process. Upload candidate resumes, and our AI will
              extract key information, analyze skills, and automatically
              generate tailored interview questions based on the candidate's
              experience and qualifications.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-y-3">
              <NavigationButton
                to={getDestination()}
                className="rounded-md bg-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-md hover:bg-indigo-500 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center cursor-pointer transition-all duration-300 relative"
              >
                Upload the Resume for Analyzing
                <ArrowRightIcon className="ml-2 h-5 w-5" />
                {shouldApplyRateLimits() && !isSignedIn && (
                  <span
                    className={`absolute -top-3 -right-3 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm ${
                      uploadCount >= 2 ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {uploadCount >= 2
                      ? "Limit reached"
                      : `${2 - uploadCount} free ${
                          2 - uploadCount === 1 ? "upload" : "uploads"
                        } left`}
                  </span>
                )}
              </NavigationButton>

              {shouldApplyRateLimits() && !isSignedIn && (
                <p className="text-xs text-indigo-800 font-medium">
                  {uploadCount >= 2
                    ? "You've used all free uploads. Sign up to continue."
                    : "Free users can upload up to 2 resumes for analysis."}
                </p>
              )}
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
        className="py-24 sm:py-32 bg-gradient-to-b from-white to-indigo-50"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Streamline Your Hiring Process
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything HR professionals need for effective interviews
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              JobPsych analyzes candidate resumes and job descriptions to
              generate tailored interview questions, saving hours of preparation
              time. Our platform helps HR teams conduct more meaningful and
              insightful interviews.
            </p>
            <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">
                How It Works
              </h3>
              <ol className="list-decimal pl-6 text-left space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Upload Resumes</span> - Simply
                  upload a candidate's resume in PDF or Word format
                </li>
                <li>
                  <span className="font-medium">AI Analysis</span> - Our AI
                  extracts key information, skills, and experience
                </li>
                <li>
                  <span className="font-medium">Question Generation</span> -
                  Receive tailored interview questions based on the candidate's
                  background
                </li>
                <li>
                  <span className="font-medium">Conduct Better Interviews</span>{" "}
                  - Use our insights to focus on what matters for each role
                </li>
              </ol>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                  </div>
                  Resume Analysis
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Our AI parses your resume to identify key skills, experiences,
                  and achievements to focus on during interviews.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  Tailored Questions
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Get custom interview questions that highlight your strengths
                  and help you prepare for potential challenges.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                  </div>
                  Instant Feedback
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Get immediate insights into how your resume aligns with job
                  requirements and where you can improve.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                  Privacy Focused
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Your data is encrypted and secure. We never share your resume
                  or personal information with third parties.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Pricing Plans
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Find the perfect plan for your needs
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Choose from our flexible pricing options. From free access to
              premium features, we have a plan that fits your needs and budget.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
            {/* Free Plan */}
            <div className="flex flex-col rounded-3xl bg-white shadow-xl ring-1 ring-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="p-8 sm:p-10">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
                  Free
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Perfect for trying out our service
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    $0
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /forever
                  </span>
                </p>
                <button
                  onClick={() => handlePlanSelect("free")}
                  className="mt-6 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Start Now
                </button>
              </div>
              <div className="flex flex-1 flex-col justify-between p-8 pt-0 sm:p-10 sm:pt-0">
                <ul className="space-y-4 text-sm leading-6 text-gray-600">
                  <li className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    2 resume analyses per day
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Basic interview questions
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Standard processing time
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Email support
                  </li>
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="flex flex-col rounded-3xl bg-white shadow-xl ring-1 ring-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative">
              <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 text-center text-sm font-medium text-white">
                Popular
              </div>
              <div className="p-8 sm:p-10">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
                  Pro
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Great for job seekers and recruiters
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    $29.99
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /month
                  </span>
                </p>
                <button
                  onClick={() => {
                    setShowPricingModal(true);
                    setSelectedPlan("pro");
                  }}
                  className="mt-6 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Subscribe Now
                </button>
              </div>
              <div className="flex flex-1 flex-col justify-between p-8 pt-0 sm:p-10 sm:pt-0">
                <ul className="space-y-4 text-sm leading-6 text-gray-600">
                  <li className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    20 resume analyses per day
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Advanced interview questions
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Priority processing
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Detailed candidate insights
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Email & chat support
                  </li>
                </ul>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="flex flex-col rounded-3xl bg-white shadow-xl ring-1 ring-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="p-8 sm:p-10">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
                  Premium
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Perfect for HR teams and agencies
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    $49.99
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /month
                  </span>
                </p>
                <button
                  onClick={() => {
                    setShowPricingModal(true);
                    setSelectedPlan("premium");
                  }}
                  className="mt-6 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Subscribe Now
                </button>
              </div>
              <div className="flex flex-1 flex-col justify-between p-8 pt-0 sm:p-10 sm:pt-0">
                <ul className="space-y-4 text-sm leading-6 text-gray-600">
                  <li className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unlimited resume analyses
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    AI-powered insights
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Custom question templates
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Team collaboration tools
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Priority support
                  </li>
                </ul>
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

      {/* Pricing Modal */}
      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        onSelectPlan={handlePlanSelect}
      />
    </div>
  );
};

export default LandingPage;
