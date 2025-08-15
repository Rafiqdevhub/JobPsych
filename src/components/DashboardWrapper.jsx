import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import PremiumDashboard from "./PremiumDashboard";
import { useUserManager } from "../hooks/useUserManager";

const DashboardWrapper = () => {
  const { isSignedIn, isLoaded } = useUser();
  const { userPlan, isBackendSynced, isSyncing } = useUserManager();
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

      if (!isBackendSynced && isSyncing) {
        return;
      }

      setIsLoading(false);
    };

    checkUserStatus();
  }, [isSignedIn, isLoaded, isBackendSynced, isSyncing, navigate]);

  if (isLoading || !isLoaded || (isSignedIn && !isBackendSynced && isSyncing)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {isSyncing
              ? "Setting up your account..."
              : "Loading your dashboard..."}
          </p>
        </div>
      </div>
    );
  }

  if (isDev) {
    return <PremiumDashboard />;
  }

  if (userPlan === "pro") {
    return <PremiumDashboard />;
  } else {
    return <Dashboard />;
  }
};

export default DashboardWrapper;
