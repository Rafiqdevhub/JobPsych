import React from "react";

export function SafeComponentWrapper({ children, fallback = null }) {
  try {
    return React.isValidElement(children) ? children : fallback;
  } catch (error) {
    console.warn("SafeComponentWrapper caught error:", error);
    return fallback;
  }
}

export function withErrorBoundary(Component, fallbackComponent = null) {
  return function WrappedComponent(props) {
    try {
      return React.createElement(Component, props);
    } catch (error) {
      console.warn(
        "Component wrapped with withErrorBoundary caught error:",
        error
      );
      return (
        fallbackComponent ||
        React.createElement("div", {
          className:
            "p-4 text-red-600 bg-red-50 rounded-lg border border-red-200",
          children: "Component failed to render",
        })
      );
    }
  };
}

export default SafeComponentWrapper;
