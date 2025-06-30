import React from "react";

export const safeUseEffect = (effect, deps) => {
  try {
    return React.useEffect(effect, deps);
  } catch (error) {
    console.warn("useEffect error caught:", error);
    if (typeof effect === "function") {
      try {
        const cleanup = effect();
        if (typeof cleanup === "function") {
          setTimeout(cleanup, 0);
        }
      } catch (effectError) {
        console.warn("Effect execution failed:", effectError);
      }
    }
  }
};

export const safeUseState = (initialState) => {
  try {
    return React.useState(initialState);
  } catch (error) {
    console.warn("useState error caught:", error);
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
