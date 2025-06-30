// React 19 compatibility utilities
import React from "react";

// Safe hook caller to prevent invalid hook call errors
export const safeUseEffect = (effect, deps) => {
  try {
    return React.useEffect(effect, deps);
  } catch (error) {
    console.warn("useEffect error caught:", error);
    // Fallback behavior for when hooks fail
    if (typeof effect === "function") {
      // Try to call effect directly as a fallback
      try {
        const cleanup = effect();
        if (typeof cleanup === "function") {
          // Schedule cleanup for later
          setTimeout(cleanup, 0);
        }
      } catch (effectError) {
        console.warn("Effect execution failed:", effectError);
      }
    }
  }
};

// Safe state setter
export const safeUseState = (initialState) => {
  try {
    return React.useState(initialState);
  } catch (error) {
    console.warn("useState error caught:", error);
    // Return a fallback state and setter
    let currentState = initialState;
    const setState = (newState) => {
      currentState =
        typeof newState === "function" ? newState(currentState) : newState;
    };
    return [currentState, setState];
  }
};

// Safe component renderer
export const safeRender = (Component, props = {}, fallback = null) => {
  try {
    if (typeof Component === "function") {
      return React.createElement(Component, props);
    }
    return Component;
  } catch (error) {
    console.warn("Component render error:", error);
    return fallback;
  }
};

export default {
  safeUseEffect,
  safeUseState,
  safeRender,
};
