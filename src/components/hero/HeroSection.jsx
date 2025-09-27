import React, { useState, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import TypewriterText from "@components/TypewriterText";

const HeroSection = ({ resumeData }) => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900"
    >
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-br from-indigo-500/10 to-blue-500/10"></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-8 sm:pt-24 sm:pb-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center px-8 py-4 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium mb-8">
            AI-Powered Career Intelligence Platform
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white leading-tight">
            <div className="mb-4">Transform Your</div>
            <TypewriterText
              text="Career Journey with AI"
              className="text-indigo-400"
              loop={true}
              delay={3}
              eraseSpeed={50}
              typeSpeed={80}
            />
          </h1>

          <p className="mt-8 text-xl sm:text-2xl md:text-3xl leading-relaxed text-gray-300 max-w-4xl mx-auto">
            <span className="font-semibold text-indigo-400">
              Four Powerful AI Tools:
            </span>{" "}
            Career role discovery, interview mastery, ATS optimization, and
            intelligent hiring solutions.
          </p>

          <div className="mt-16 p-8 bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              {[
                {
                  title: "Role Suggestions",
                  description: "AI-powered career matching",
                  color: "text-blue-400",
                  bgColor: "bg-slate-700",
                  borderColor: "border-blue-500/30",
                  index: 0,
                },
                {
                  title: "InterviewPrep AI",
                  description: "Master interviews with AI coaching",
                  color: "text-purple-400",
                  bgColor: "bg-slate-700",
                  borderColor: "border-purple-500/30",
                  index: 1,
                },
                {
                  title: "ATS Analyzer",
                  description: "Resume optimization for ATS systems",
                  color: "text-emerald-400",
                  bgColor: "bg-slate-700",
                  borderColor: "border-emerald-500/30",
                  index: 2,
                },
                {
                  title: "HireDisk",
                  description: "AI hiring intelligence for recruiters",
                  color: "text-orange-400",
                  bgColor: "bg-slate-700",
                  borderColor: "border-orange-500/30",
                  index: 3,
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`group relative p-6 ${
                    card.bgColor
                  } rounded-2xl border ${
                    card.borderColor
                  } transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
                    activeCard === card.index ? "scale-105 shadow-lg" : ""
                  }`}
                  onMouseEnter={() => setActiveCard(card.index)}
                >
                  <div className="text-center">
                    <h3 className={`font-bold text-lg mb-3 ${card.color}`}>
                      {card.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-row items-center justify-center gap-4 flex-wrap md:flex-nowrap">
            {[
              {
                label: "Role Suggestions",
                href: "/role-suggestions",
                gradient: "from-blue-500 via-blue-600 to-indigo-600",
                hoverGradient: "from-blue-600 via-blue-700 to-indigo-700",
                glowColor: "shadow-blue-500/50",
                borderColor: "border-blue-400/50",
                icon: "🎯",
              },
              {
                label: "InterviewPrep AI",
                href: "/interview-prepai",
                gradient: "from-purple-500 via-purple-600 to-pink-600",
                hoverGradient: "from-purple-600 via-purple-700 to-pink-700",
                glowColor: "shadow-purple-500/50",
                borderColor: "border-purple-400/50",
                icon: "🤖",
              },
              {
                label: "ATS Analyzer",
                href: "/ats-analyzer",
                gradient: "from-emerald-500 via-emerald-600 to-teal-600",
                hoverGradient: "from-emerald-600 via-emerald-700 to-teal-700",
                glowColor: "shadow-emerald-500/50",
                borderColor: "border-emerald-400/50",
                icon: "📊",
              },
              {
                label: "HireDisk",
                href: "/hiredisk",
                gradient: "from-orange-500 via-orange-600 to-red-600",
                hoverGradient: "from-orange-600 via-orange-700 to-red-700",
                glowColor: "shadow-orange-500/50",
                borderColor: "border-orange-400/50",
                icon: "💼",
              },
            ].map((button, index) => (
              <button
                key={button.label}
                onClick={() => (window.location.href = button.href)}
                className={`group relative overflow-hidden px-6 py-4 min-w-[200px] flex-1 max-w-[240px] bg-gradient-to-r ${button.gradient} text-white font-bold rounded-2xl shadow-2xl ${button.glowColor} hover:shadow-3xl transform hover:scale-110 hover:-translate-y-1 transition-all duration-500 flex items-center justify-center space-x-2 border-2 ${button.borderColor} hover:border-white/50 cursor-pointer`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  backgroundSize: "200% 200%",
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${button.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${button.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                ></div>

                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-100"></div>
                  <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-300"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-500"></div>
                </div>

                <div className="relative z-10 flex items-center space-x-2">
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    {button.icon}
                  </span>
                  <span className="font-bold text-sm md:text-base tracking-wide group-hover:tracking-wider transition-all duration-300">
                    {button.label}
                  </span>
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                </div>

                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
              </button>
            ))}
          </div>
          {resumeData?.roleRecommendations?.length > 0 && (
            <div className="mt-12 space-y-4">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                Your Personalized Role Matches
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resumeData.roleRecommendations
                  .slice(0, 3)
                  .map((role, index) => (
                    <div
                      key={index}
                      className="p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg text-white">
                          {role.roleName}
                        </h4>
                        <div className="flex items-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                              role.matchPercentage >= 80
                                ? "bg-green-500"
                                : role.matchPercentage >= 60
                                ? "bg-yellow-500"
                                : "bg-orange-500"
                            }`}
                          >
                            {role.matchPercentage}%
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {role.reasoning}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium border border-blue-500/30">
                          {role.careerLevel}
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium border border-purple-500/30">
                          {role.industryFit} Fit
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "AI Analyses", value: "50K+" },
              { label: "Success Rate", value: "94%" },
              { label: "Job Matches", value: "25K+" },
              { label: "Happy Users", value: "15K+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-indigo-400 mb-3">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Down Indicator */}
          <div className="mt-20 hidden md:flex flex-col items-center justify-center">
            <p className="text-gray-400 text-sm mb-6 font-medium">
              Discover More Features Below
            </p>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-indigo-400 rounded-full flex items-center justify-center mb-3 animate-pulse">
                <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
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
