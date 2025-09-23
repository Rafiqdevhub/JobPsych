import React from "react";
import HireDisk from "@pages/HireDisk";
import RoleSuggestion from "@pages/RoleSuggestion.jsx";

const DashboardWrapper = () => {
  const isDev = import.meta.env?.DEV === true;

  if (isDev) {
    return <HireDisk />;
  }

  return <RoleSuggestion />;
};

export default DashboardWrapper;
