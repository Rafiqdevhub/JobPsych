import React, { useState, useEffect } from "react";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../utils/api";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

const CustomAuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    user_type: "candidate",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = mode === "login" ? "login" : "register";
    const url = `${VITE_BACKEND_URL}/api/auth/${endpoint}`;

    try {
      const res = await axios.post(
        url,
        mode === "login" ? { email: form.email, password: form.password } : form
      );

      console.warn("✅ API Response:", res.data);
      console.warn("✅ Response structure:", {
        hasData: !!res.data,
        dataKeys: Object.keys(res.data || {}),
        hasUser: !!res.data?.user,
        hasToken: !!res.data?.token,
        hasAccessToken: !!res.data?.accessToken,
        hasRefreshToken: !!res.data?.refreshToken,
        hasNestedData: !!res.data?.data,
        nestedDataKeys: res.data?.data ? Object.keys(res.data.data) : [],
        nestedUser: !!res.data?.data?.user,
        nestedAccessToken: !!res.data?.data?.accessToken,
        nestedRefreshToken: !!res.data?.data?.refreshToken,
        nestedToken: !!res.data?.data?.token,
      });

      // Log the actual token values (first 20 chars for security)
      if (res.data?.data?.accessToken) {
        console.warn(
          "🔑 Access Token (first 20 chars):",
          res.data.data.accessToken.substring(0, 20) + "..."
        );
      }
      if (res.data?.data?.refreshToken) {
        console.warn(
          "🔑 Refresh Token (first 20 chars):",
          res.data.data.refreshToken.substring(0, 20) + "..."
        );
      }
      if (res.data?.accessToken) {
        console.warn(
          "🔑 Direct Access Token (first 20 chars):",
          res.data.accessToken.substring(0, 20) + "..."
        );
      }
      if (res.data?.refreshToken) {
        console.warn(
          "🔑 Direct Refresh Token (first 20 chars):",
          res.data.refreshToken.substring(0, 20) + "..."
        );
      }

      onAuthSuccess(res.data);
      onClose();
    } catch (err) {
      console.error("❌ API Error:", err);
      console.error("Error Response:", err.response);
      console.error("Error Status:", err.response?.status);
      console.error("Error Data:", err.response?.data);

      setError(
        err.response?.data?.message ||
          `Authentication failed (${
            err.response?.status || "Unknown"
          }). Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out scale-100 animate-fade-in-up border border-gray-200">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 z-10"
          onClick={onClose}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-6 px-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <UserIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {mode === "login" ? "Welcome Back" : "Join JobPsych"}
          </h2>
          <p className="text-gray-600 mt-2">
            {mode === "login"
              ? "Sign in to your account"
              : "Create your account to get started"}
          </p>
        </div>

        {/* Form */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "register" && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 bg-white text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 bg-white text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 bg-white text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </label>
                <div className="relative">
                  <select
                    name="user_type"
                    value={form.user_type}
                    onChange={handleChange}
                    className="w-full pl-4 pr-10 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 bg-white text-gray-900 transition-all duration-200 outline-none appearance-none"
                  >
                    <option value="candidate">Job Seeker</option>
                    <option value="recruiter">Recruiter</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span>
                {loading
                  ? "Signing in..."
                  : mode === "login"
                  ? "Sign In"
                  : "Create Account"}
              </span>
              {!loading && <ArrowRightIcon className="h-5 w-5" />}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                className="ml-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAuthModal;
