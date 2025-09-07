import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import HireDisk from "@pages/HireDisk";
import RoleSuggestion from "@pages/RoleSuggestion.jsx";

const DashboardWrapper = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const isDev = import.meta.env?.DEV === true;

  useEffect(() => {
    const checkUserStatus = async () => {
      if (!isLoaded) return;

      if (!isSignedIn) {
        navigate("/sign-up");
        return;
      }

      setIsLoading(false);
    };

    checkUserStatus();
  }, [isSignedIn, isLoaded, navigate]);

  if (isLoading || !isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (isDev) {
    return <HireDisk />;
  }

  return <RoleSuggestion />;
};

export default DashboardWrapper;
