import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-br from-indigo-500/10 to-blue-500/10"></div>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      <div className="relative z-10 text-center px-6 py-12 max-w-4xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-2xl rounded-3xl border border-slate-700/50 shadow-2xl p-8 sm:p-12">
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 px-8 py-6 rounded-2xl shadow-2xl border border-white/20">
                <p className="text-6xl sm:text-8xl font-black text-white tracking-tight">
                  404
                </p>
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mb-2">
              Oops! Page Not Found
            </span>
          </h1>
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-4">
              The page you are looking for seems to have vanished into the
              digital void. Do not worry though - our AI-powered platform has
              plenty of amazing features waiting for you!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              to="/"
              className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 px-8 py-4 text-white font-bold rounded-2xl shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105 border border-white/10 inline-flex items-center gap-3"
            >
              <span className="font-black tracking-wide">Go to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
