import React from "react";

export const useSafeEffect = (effect, deps) => {
  try {
    return React.useEffect(effect, deps);
  } catch {
    if (typeof effect === "function") {
      try {
        const cleanup = effect();
        if (typeof cleanup === "function") {
          setTimeout(cleanup, 0);
        }
      } catch {
        // Effect execution failed silently
      }
    }
  }
};

export const useSafeState = (initialState) => {
  try {
    return React.useState(initialState);
  } catch {
    let currentState = initialState;
    const setState = (newState) => {
      currentState =
        typeof newState === "function" ? newState(currentState) : newState;
    };
    return [currentState, setState];
  }
};

export const safeRender = (Component, props = {}, fallback = null) => {
  try {
    if (typeof Component === "function") {
      return React.createElement(Component, props);
    }
    return Component;
  } catch {
    return fallback;
  }
};

export default {
  useSafeEffect,
  useSafeState,
  safeRender,
};
