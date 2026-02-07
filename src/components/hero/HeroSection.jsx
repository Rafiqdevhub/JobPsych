import React, { useState, useEffect } from "react";
import {
  ArrowRightIcon,
  SparklesIcon,
  RocketLaunchIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

const HeroSection = ({ resumeData }) => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-60 h-60 bg-blue-500/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-8 sm:pt-24 sm:pb-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/50 border border-indigo-500/20 text-slate-300 text-xs font-semibold tracking-widest uppercase hover:border-indigo-500/50 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/70">
            <SparklesIcon
              className="h-4 w-4 text-indigo-400 animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <span>Career Readiness & Interview Success</span>
            <SparklesIcon
              className="h-4 w-4 text-indigo-400 animate-spin"
              style={{ animationDuration: "3s", animationDirection: "reverse" }}
            />
          </div>

          <h1 className="relative mb-8 text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-tight">
            <div className="relative inline-block">
              <span className="text-white">AI-Based </span>
              <span className="relative inline-block text-indigo-300 ml-2">
                Career Readiness and Interview Preparation System
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent rounded-full"></div>
              </span>
            </div>
            <div className="mt-4 text-slate-300 text-3xl sm:text-4xl md:text-5xl font-light">
              Discover roles, documents quality improvement, and master
              interviews
            </div>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive AI-based system ensures you're fully prepared for
            every stage of your career journey. From role discovery and
            documents quality improvement to interview mastery get ready to
            succeed with confidence.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Career Path Exploration Module",
                description:
                  "Prepare for your career transition with AI-guided role discovery that matches your skills and aspirations",

                borderColor: "border-blue-500/30",
                hoverBorder: "hover:border-blue-500/60",
                accentBg: "bg-blue-500/20",
                lightBg: "bg-blue-500/5",
                index: 0,
              },
              {
                title:
                  "Professional Document Structure and Content Analysis Module",
                description:
                  "Ensure interview readiness with resume optimization that identifies gaps and enhances content for maximum impact",

                borderColor: "border-emerald-500/30",
                hoverBorder: "hover:border-emerald-500/60",
                accentBg: "bg-emerald-500/20",
                lightBg: "bg-emerald-500/5",
                index: 1,
              },
              {
                title: "AI-Assisted Interview Practice Module",
                description:
                  "Build complete interview readiness through AI-powered practice, intelligent feedback, and confidence-building preparation",

                borderColor: "border-purple-500/30",
                hoverBorder: "hover:border-purple-500/60",
                accentBg: "bg-purple-500/20",
                lightBg: "bg-purple-500/5",
                index: 2,
              },
            ].map((card) => {
              return (
                <div
                  key={card.title}
                  className={`group relative overflow-hidden p-8 rounded-2xl border ${
                    card.borderColor
                  } ${
                    card.hoverBorder
                  } transition-all duration-300 backdrop-blur-sm cursor-pointer ${
                    activeCard === card.index
                      ? "bg-slate-800/80 border-opacity-100 shadow-2xl scale-105"
                      : "bg-slate-800/40 border-opacity-50 hover:bg-slate-800/60 hover:shadow-xl"
                  }`}
                  onMouseEnter={() => setActiveCard(card.index)}
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 ${card.lightBg} transition-opacity duration-300`}
                  ></div>

                  <div
                    className={`relative z-10 mb-0 inline-flex p-3 rounded-lg bg-gradient-to-br ${card.color} text-white/20 group-hover:text-white/40 transition-all duration-300`}
                  ></div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 text-left group-hover:text-indigo-300 transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed text-left group-hover:text-slate-200 transition-colors duration-300">
                      {card.description}
                    </p>
                  </div>
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${card.color} rounded-full blur-2xl -z-10 transition-opacity duration-300`}
                  ></div>
                </div>
              );
            })}
          </div>

          <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            {[
              {
                label: "Discover Your Ideal Roles",
                href: "/role-suggestions",
                icon: RocketLaunchIcon,
                color: "from-blue-600 to-cyan-600",
                hoverColor: "from-blue-700 to-cyan-700",
                textColor: "text-blue-300",
                borderColor: "border-blue-400/40",
              },
              {
                label: "Improve Document Clarity",
                href: "/ats-analyzer",
                icon: DocumentCheckIcon,
                color: "from-emerald-600 to-teal-600",
                hoverColor: "from-emerald-700 to-teal-700",
                textColor: "text-emerald-300",
                borderColor: "border-emerald-400/40",
              },
              {
                label: "Ace Your Interview",
                href: "/interview-prepai",
                icon: SparklesIcon,
                color: "from-purple-600 to-pink-600",
                hoverColor: "from-purple-700 to-pink-700",
                textColor: "text-purple-300",
                borderColor: "border-purple-400/40",
              },
            ].map((btn) => {
              const BtnIcon = btn.icon;
              return (
                <button
                  key={btn.label}
                  onClick={() => (window.location.href = btn.href)}
                  className={`group relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden border ${btn.borderColor} transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center gap-3 hover:-translate-y-1 cursor-pointer`}
                  style={{
                    background: `linear-gradient(135deg, var(--color-start), var(--color-end))`,
                    "--color-start": "rgb(59, 130, 246)",
                    "--color-end": "rgb(34, 211, 238)",
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${btn.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                  <div className="relative z-10 flex items-center gap-2">
                    <BtnIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-semibold">{btn.label}</span>
                    <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 ml-1" />
                  </div>
                </button>
              );
            })}
          </div>

          {resumeData?.roleRecommendations?.length > 0 && (
            <div className="mt-24 space-y-8">
              <div className="relative">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
                  <span className="text-indigo-300">
                    Roles You're Ready For
                  </span>
                  <br />
                  Career Opportunities Matched to Your Profile
                </h2>
                <p className="text-center text-slate-300 mt-4 text-lg max-w-2xl mx-auto">
                  AI-analyzed career paths aligned with your skills, experience,
                  and readiness level
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {resumeData.roleRecommendations
                  .slice(0, 3)
                  .map((role, index) => (
                    <div
                      key={index}
                      className="group relative p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 hover:shadow-2xl hover:scale-105 backdrop-blur-sm overflow-hidden transition-all duration-300"
                    >
                      <div className="absolute top-4 right-4">
                        <div
                          className={`relative w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br ${
                            role.matchPercentage >= 80
                              ? "from-emerald-500 to-green-600"
                              : role.matchPercentage >= 60
                                ? "from-yellow-500 to-amber-600"
                                : "from-orange-500 to-red-600"
                          }`}
                        >
                          <span>{role.matchPercentage}</span>
                          <span className="text-xs absolute bottom-0 right-0 translate-x-1 translate-y-1">
                            %
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white mb-3 pr-20 group-hover:text-indigo-300 transition-colors duration-300">
                          {role.roleName}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-200 mb-5 transition-colors duration-300">
                          {role.reasoning}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-6">
                          <span className="px-3 py-1 bg-slate-700/50 text-slate-200 rounded-full text-xs font-medium border border-slate-600/50 group-hover:border-indigo-400/50 transition-colors duration-300">
                            {role.careerLevel}
                          </span>
                          <span className="px-3 py-1 bg-slate-700/50 text-slate-200 rounded-full text-xs font-medium border border-slate-600/50 group-hover:border-indigo-400/50 transition-colors duration-300">
                            {role.industryFit} Fit
                          </span>
                        </div>
                      </div>

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl -z-10 transition-opacity duration-300"></div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="mt-24 hidden md:flex flex-col items-center justify-center animate-fade-in-up">
            <p className="text-slate-400 text-sm mb-8 font-medium tracking-widest uppercase">
              Scroll to Explore
            </p>
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-10 border-2 border-indigo-400/50 rounded-full flex items-center justify-center group hover:border-indigo-400 transition-colors duration-300">
                <div className="w-1 h-2 bg-indigo-400 rounded-full animate-bounce group-hover:scale-125 transition-transform duration-300"></div>
              </div>
              <ArrowRightIcon
                className="h-5 w-5 text-indigo-400/50 animate-bounce rotate-90"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
