import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import PremiumDashboard from "./PremiumDashboard";
import LoadingError from "./LoadingError";

const DashboardWrapper = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const [userPlan, setUserPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const determinePlan = async () => {
      if (!isLoaded) return;

      if (!isSignedIn) {
        navigate("/sign-up");
        return;
      }

      try {
        const savedPlan = localStorage.getItem("userPlan");

        if (savedPlan) {
          setUserPlan(savedPlan);
        } else {
          setUserPlan("free");
          localStorage.setItem("userPlan", "free");
        }
      } catch (error) {
        console.error("Error determining user plan:", error);
        setUserPlan("free");
        localStorage.setItem("userPlan", "free");
      } finally {
        setIsLoading(false);
      }
    };

    determinePlan();
  }, [isSignedIn, isLoaded, user, navigate]);

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

  if (userPlan === "pro") {
    return <PremiumDashboard />;
  } else {
    return <Dashboard />;
  }
};

export default DashboardWrapper;
