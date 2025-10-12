import "./index.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import CookieConsentBanner from "./components/privacy/CookieConsentBanner";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] animate-[wave_10s_linear_infinite] motion-safe:transform-none"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-full bg-gradient-to-r from-blue-50 via-blue-50/70 to-sky-50/50 opacity-40 blur-[106px] animate-pulse"></div>
      </div>

      <Outlet />
      <Chatbot />
      <CookieConsentBanner />
    </div>
  );
};

export default App;
