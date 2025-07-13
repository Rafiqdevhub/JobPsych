import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {
  ChartBarIcon,
  DocumentTextIcon,
  StarIcon,
  CalendarIcon,
  TrophyIcon,
  CheckCircleIcon,
  BoltIcon,
  ShieldCheckIcon,
  FireIcon,
  ChartPieIcon,
  CogIcon,
  UserCircleIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarIconSolid,
  SparklesIcon as SparklesIconSolid,
} from "@heroicons/react/24/solid";
import ResumeUpload from "./ResumeUpload";
import Toast from "./Toast";
import NavigationButton from "./NavigationButton";
import { useClerk } from "@clerk/clerk-react";

const PremiumDashboard = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [uploadCount, setUploadCount] = useState(0);
  const [scansRemaining, setScansRemaining] = useState(20);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/sign-up");
      return;
    }

    const userPlan = localStorage.getItem("userPlan");
    if (userPlan !== "pro") {
      navigate("/dashboard");
      return;
    }

    const savedUploadCount = localStorage.getItem(`uploadCount_${user?.id}`);
    const savedScansRemaining = localStorage.getItem(
      `scansRemaining_${user?.id}`
    );

    if (savedUploadCount) {
      setUploadCount(parseInt(savedUploadCount));
    }

    if (savedScansRemaining) {
      setScansRemaining(parseInt(savedScansRemaining));
    }
  }, [isSignedIn, user, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest(".profile-dropdown")) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  const handleResumeUploaded = () => {
    const newUploadCount = uploadCount + 1;
    const newScansRemaining = Math.max(0, scansRemaining - 1);

    setUploadCount(newUploadCount);
    setScansRemaining(newScansRemaining);

    localStorage.setItem(`uploadCount_${user?.id}`, newUploadCount.toString());
    localStorage.setItem(
      `scansRemaining_${user?.id}`,
      newScansRemaining.toString()
    );

    setToastMessage(
      "Resume analyzed successfully! Premium insights generated."
    );
    setToastType("success");
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const features = [
    {
      icon: BoltIcon,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms analyze your resume in real-time",
      status: "active",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: ChartPieIcon,
      title: "Performance Analytics",
      description:
        "Comprehensive insights and improvement tracking with detailed reports",
      status: "active",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: ShieldCheckIcon,
      title: "Priority Support",
      description:
        "24/7 expert assistance and dedicated premium customer service",
      status: "active",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: TrophyIcon,
      title: "Industry Benchmarking",
      description: "Compare against 100K+ successful resumes in your industry",
      status: "active",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: FireIcon,
      title: "ATS Optimization",
      description:
        "Ensure your resume passes through Applicant Tracking Systems",
      status: "active",
      gradient: "from-red-400 to-rose-500",
    },
    {
      icon: CogIcon,
      title: "Custom Templates",
      description: "Access to premium resume templates and formatting options",
      status: "active",
      gradient: "from-indigo-400 to-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.1)_1px,transparent_0)] bg-[size:20px_20px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <NavigationButton
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 px-5 py-3 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Back to home page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span>Back to Home</span>
          </NavigationButton>

          <div className="relative profile-dropdown">
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-2 hover:bg-white hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 truncate max-w-24">
                    {user?.firstName ||
                      user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
                      "User"}
                  </p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
              </div>
              <ChevronDownIcon
                className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                  showProfileDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.firstName} {user?.lastName || ""}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90"></div>
          <div className="absolute -top-4 -right-4 transform rotate-12">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <StarIconSolid key={i} className="h-4 w-4 text-yellow-300/60" />
              ))}
            </div>
          </div>
          <div className="absolute -bottom-2 -left-2">
            <SparklesIconSolid className="h-16 w-16 text-white/20" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <TrophyIcon className="h-10 w-10 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                  Premium Dashboard
                </h1>
                <p className="text-indigo-100 text-lg">
                  Unlock your career potential with AI-powered insights
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
              <div className="flex -space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white"
                  ></div>
                ))}
              </div>
              <span className="text-white text-sm font-medium">
                Elite Member
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Scans Remaining
                  </p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {scansRemaining}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
                  <DocumentTextIcon className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Monthly limit</span>
                  <span className="font-semibold text-gray-900">
                    {scansRemaining}/20
                  </span>
                </div>
                <div className="relative">
                  <div className="flex h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 ease-out relative overflow-hidden"
                      style={{ width: `${(scansRemaining / 20) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Total Scans
                  </p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {uploadCount}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                  <ChartBarIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              <p className="text-sm text-gray-600 flex items-center">
                <TrophyIcon className="h-4 w-4 mr-1 text-amber-500" />
                All-time analyses completed
              </p>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Plan Status
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Premium
                    </p>
                    <div className="flex items-center space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <StarIconSolid
                          key={i}
                          className="h-4 w-4 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                  <StarIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">
                  Active subscription
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 mb-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
              Premium Features Suite
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Unlock the full potential of AI-powered career advancement tools
              designed for professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`}
                ></div>

                <div className="relative z-10">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 bg-gradient-to-r ${feature.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                          {feature.title}
                        </h3>
                        <CheckCircleIcon className="h-5 w-5 text-green-500 opacity-80" />
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  AI-Powered Resume Analysis
                </h2>
                <p className="text-gray-600">
                  Upload your resume for comprehensive analysis with premium
                  insights and recommendations
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2">
                <BoltIcon className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  AI Enhanced
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {scansRemaining > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-8 py-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {scansRemaining}
                    </div>
                    <div className="text-sm text-gray-500">Scans Left</div>
                  </div>
                  <div className="h-8 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {uploadCount}
                    </div>
                    <div className="text-sm text-gray-500">Completed</div>
                  </div>
                  <div className="h-8 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      AI+
                    </div>
                    <div className="text-sm text-gray-500">Premium</div>
                  </div>
                </div>

                <ResumeUpload
                  onResumeUploaded={handleResumeUploaded}
                  isPremium={true}
                />
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full"></div>
                  </div>
                  <CalendarIcon className="relative h-12 w-12 text-gray-400 mx-auto" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Monthly Limit Reached
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  You've successfully completed all 20 premium analyses for this
                  month. Your plan will automatically reset on the 1st of next
                  month.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate("/pricing")}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <TrophyIcon className="h-5 w-5 mr-2" />
                    Upgrade Plan
                  </button>

                  <button
                    onClick={() => navigate("/dashboard")}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    View History
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};

export default PremiumDashboard;
