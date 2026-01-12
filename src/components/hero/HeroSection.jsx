import React, { useState, useEffect } from "react";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import TypewriterText from "@components/TypewriterText";

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
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-8 sm:pt-24 sm:pb-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 text-slate-300 text-sm font-medium mb-8 hover:border-indigo-500/60 backdrop-blur-sm">
            <SparklesIcon className="h-4 w-4 text-indigo-400" />
            <span>AI-Powered Career Intelligence Platform</span>
            <SparklesIcon className="h-4 w-4 text-indigo-400" />
          </div>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 text-white leading-tight"
            style={{ fontFamily: "'Tinos', serif" }}
          >
            <div className="mb-4 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-slate-100">
                Transform Your
              </span>
              <div className="absolute inset-0 bg-gradient-to-r "></div>
            </div>
            <div className="relative">
              <TypewriterText
                text="Career Journey with AI"
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 font-black"
                loop={true}
                delay={3}
                eraseSpeed={50}
                typeSpeed={80}
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg blur-2xl -z-10"></div>
            </div>
          </h1>

          <p
            className="mt-8 text-lg sm:text-xl md:text-2xl leading-relaxed text-slate-300 max-w-4xl mx-auto"
            style={{ fontFamily: "'Tinos', serif" }}
          >
            <span className="font-bold text-indigo-300">
              Three Powerful AI Tools:
            </span>{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent font-semibold">
              Career role discovery, ATS optimization, and interview mastery.
            </span>
          </p>

          <div className="mt-16 p-8 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Role Suggestions",
                  description: "AI-powered career matching",
                  color: "text-blue-400",
                  bgGradient: "from-blue-500/10 to-blue-600/10",
                  borderColor: "border-blue-500/30",
                  accentColor: "bg-blue-500/20",
                  index: 0,
                },
                {
                  title: "ATS Analyzer",
                  description: "Resume optimization for ATS systems",
                  color: "text-emerald-400",
                  bgGradient: "from-emerald-500/10 to-emerald-600/10",
                  borderColor: "border-emerald-500/30",
                  accentColor: "bg-emerald-500/20",
                  index: 1,
                },
                {
                  title: "InterviewPrep AI",
                  description: "Master interviews with AI coaching",
                  color: "text-purple-400",
                  bgGradient: "from-purple-500/10 to-purple-600/10",
                  borderColor: "border-purple-500/30",
                  accentColor: "bg-purple-500/20",
                  index: 2,
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`group relative p-6 bg-gradient-to-br ${
                    card.bgGradient
                  } rounded-2xl border ${
                    card.borderColor
                  } hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden backdrop-blur-sm ${
                    activeCard === card.index
                      ? "scale-105 shadow-2xl border-opacity-100"
                      : "border-opacity-50"
                  }`}
                  onMouseEnter={() => setActiveCard(card.index)}
                >
                  {" "}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 p-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <div className="relative z-10 text-center">
                    <div
                      className={`h-1 w-8 mx-auto mb-3 rounded-full ${card.accentColor} group-hover:w-16`}
                    ></div>
                    <h3
                      className={`font-bold text-lg mb-3 ${card.color} group-hover:text-lg transition-all duration-300`}
                      style={{ fontFamily: "'Tinos', serif" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-row items-center justify-center gap-3 flex-wrap md:flex-nowrap px-2">
            {[
              {
                label: "Role Suggestions",
                href: "/role-suggestions",
                gradient: "from-blue-500 via-blue-600 to-indigo-600",
                hoverGradient: "from-blue-600 via-blue-700 to-indigo-700",
                glowColor: "shadow-blue-500/50",
                borderColor: "border-blue-400/50",
              },
              {
                label: "ATS Analyzer",
                href: "/ats-analyzer",
                gradient: "from-emerald-500 via-emerald-600 to-teal-600",
                hoverGradient: "from-emerald-600 via-emerald-700 to-teal-700",
                glowColor: "shadow-emerald-500/50",
                borderColor: "border-emerald-400/50",
              },
              {
                label: "InterviewPrep AI",
                href: "/interview-prepai",
                gradient: "from-purple-500 via-purple-600 to-pink-600",
                hoverGradient: "from-purple-600 via-purple-700 to-pink-700",
                glowColor: "shadow-purple-500/50",
                borderColor: "border-purple-400/50",
              },
            ].map((button, index) => (
              <button
                key={button.label}
                onClick={() => (window.location.href = button.href)}
                className={`group relative overflow-hidden px-6 py-4 flex-1 max-w-[200px] bg-gradient-to-r ${button.gradient} text-white font-bold rounded-xl shadow-2xl ${button.glowColor} hover:shadow-3xl transform hover:scale-110 hover:-translate-y-1 flex items-center justify-center space-x-2 border ${button.borderColor} hover:border-white/50 cursor-pointer backdrop-blur-sm`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  backgroundSize: "200% 200%",
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${button.hoverGradient} opacity-0 group-hover:opacity-100`}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full"></div>

                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${button.gradient} opacity-0 group-hover:opacity-20 blur-xl`}
                ></div>

                <div className="relative z-10 flex items-center space-x-2">
                  <span className="text-xl group-hover:scale-125 drop-shadow-lg">
                    {button.icon}
                  </span>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-xs md:text-sm tracking-wide group-hover:tracking-wider transition-all duration-300 leading-none">
                      {button.label}
                    </span>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300 ml-1" />
                </div>

                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-white/30"></div>
              </button>
            ))}
          </div>

          {resumeData?.roleRecommendations?.length > 0 && (
            <div className="mt-16 space-y-6">
              <div className="relative inline-block w-full">
                <h3
                  className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
                  style={{ fontFamily: "'Tinos', serif" }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    Your Personalized Role Matches
                  </span>
                </h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resumeData.roleRecommendations
                  .slice(0, 3)
                  .map((role, index) => (
                    <div
                      key={index}
                      className="group relative p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 hover:shadow-2xl hover:scale-105 backdrop-blur-sm overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5"></div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <h4
                            className="font-bold text-lg text-white group-hover:text-indigo-300"
                            style={{ fontFamily: "'Tinos', serif" }}
                          >
                            {role.roleName}
                          </h4>
                          <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg transform group-hover:scale-110 bg-gradient-to-br ${
                              role.matchPercentage >= 80
                                ? "from-green-500 to-emerald-600"
                                : role.matchPercentage >= 60
                                ? "from-yellow-500 to-orange-600"
                                : "from-orange-500 to-red-600"
                            }`}
                          >
                            {role.matchPercentage}%
                          </div>
                        </div>

                        <p className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-200 mb-4">
                          {role.reasoning}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30 group-hover:border-blue-400/50 backdrop-blur-sm">
                            {role.careerLevel}
                          </span>
                          <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30 group-hover:border-purple-400/50 backdrop-blur-sm">
                            {role.industryFit} Fit
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="mt-20 hidden md:flex flex-col items-center justify-center">
            <p className="text-slate-400 text-sm mb-6 font-medium">
              Discover More Features Below
            </p>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-indigo-400/50 rounded-full flex items-center justify-center mb-3 group cursor-pointer hover:border-indigo-400">
                <div className="w-3 h-3 bg-indigo-400 rounded-full group-hover:scale-125"></div>
              </div>
              <svg
                className="w-6 h-6 text-indigo-400 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
