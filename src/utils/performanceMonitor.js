// Performance monitoring utilities for JobPsych Frontend
// Functional implementation for tracking bundle sizes, loading performance, and runtime metrics

const isDevelopment = import.meta.env.DEV;

// Global metrics store
let metrics = {
  bundleSizes: {},
  loadTimes: {},
  runtimeMetrics: {},
};

// Performance budgets configuration
const PERFORMANCE_BUDGETS = {
  initialBundle: 250, // 250KB initial bundle
  vendorBundle: 150, // 150KB vendor bundle
  totalSize: 500, // 500KB total size
  loadTime: 3000, // 3s initial load time
};

/**
 * Initialize performance monitoring
 */
export const initPerformanceMonitoring = () => {
  // Track initial page load
  if (typeof window !== "undefined") {
    window.addEventListener("load", () => {
      trackPageLoad();
    });

    // Track route changes
    if (window.history) {
      const originalPushState = window.history.pushState;
      window.history.pushState = (...args) => {
        originalPushState.apply(window.history, args);
        trackRouteChange();
      };
    }
  }
};

/**
 * Track initial page load performance
 */
export const trackPageLoad = () => {
  const loadTime = performance.now();
  metrics.loadTimes.initialLoad = loadTime;

  // Log performance metrics
  if (isDevelopment) {
    console.warn("JobPsych Performance Metrics:");
    console.warn(`Initial page load: ${loadTime.toFixed(2)}ms`);
  }

  // Check if we're within performance budgets
  checkPerformanceBudgets();
};

/**
 * Track route change performance
 */
export const trackRouteChange = () => {
  const routeLoadTime = performance.now();
  metrics.loadTimes.lastRouteChange = routeLoadTime;
  if (isDevelopment) {
    console.warn(`Route change load time: ${routeLoadTime.toFixed(2)}ms`);
  }
};

/**
 * Check if current performance metrics meet budgets
 */
export const checkPerformanceBudgets = () => {
  const warnings = [];

  if (metrics.loadTimes.initialLoad > PERFORMANCE_BUDGETS.loadTime) {
    warnings.push(
      `⚠️ Initial load time (${metrics.loadTimes.initialLoad.toFixed(
        2
      )}ms) exceeds budget (${PERFORMANCE_BUDGETS.loadTime}ms)`
    );
  }

  if (warnings.length > 0) {
    console.warn("Performance Budget Warnings:");
    warnings.forEach((warning) => console.warn(warning));
  } else if (isDevelopment) {
    console.warn("✅ All performance budgets met!");
  }

  return warnings;
};

/**
 * Track component render times
 */
export const trackComponentRender = (componentName, startTime) => {
  const renderTime = performance.now() - startTime;
  metrics.runtimeMetrics[componentName] = renderTime;

  if (renderTime > 16.67) {
    // More than one frame at 60fps
    console.warn(
      `🐌 ${componentName} render took ${renderTime.toFixed(
        2
      )}ms (potential performance issue)`
    );
  }

  return renderTime;
};

/**
 * Get current memory usage
 */
export const getMemoryUsage = () => {
  if (typeof performance !== "undefined" && performance.memory) {
    return {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit,
    };
  }
  return null;
};

/**
 * Get navigation timing metrics
 */
export const getNavigationTiming = () => {
  if (typeof performance !== "undefined" && performance.getEntriesByType) {
    const navigation = performance.getEntriesByType("navigation")[0];
    if (navigation) {
      return {
        domContentLoaded:
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: getFirstPaint(),
        firstContentfulPaint: getFirstContentfulPaint(),
      };
    }
  }
  return null;
};

/**
 * Get First Paint timing
 */
export const getFirstPaint = () => {
  if (typeof performance !== "undefined" && performance.getEntriesByType) {
    const paint = performance
      .getEntriesByType("paint")
      .find((entry) => entry.name === "first-paint");
    return paint ? paint.startTime : null;
  }
  return null;
};

/**
 * Get First Contentful Paint timing
 */
export const getFirstContentfulPaint = () => {
  if (typeof performance !== "undefined" && performance.getEntriesByType) {
    const paint = performance
      .getEntriesByType("paint")
      .find((entry) => entry.name === "first-contentful-paint");
    return paint ? paint.startTime : null;
  }
  return null;
};

/**
 * Get all current performance metrics
 */
export const getPerformanceMetrics = () => {
  return {
    ...metrics,
    memory: getMemoryUsage(),
    navigation: getNavigationTiming(),
    budgets: PERFORMANCE_BUDGETS,
  };
};

/**
 * Log bundle size information
 */
export const logBundleSizes = (sizes) => {
  metrics.bundleSizes = { ...metrics.bundleSizes, ...sizes };
  if (isDevelopment) {
    console.warn("📦 Bundle Sizes:");
    Object.entries(sizes).forEach(([name, size]) => {
      console.warn(`  ${name}: ${(size / 1024).toFixed(2)} KB`);
    });
  }
};

/**
 * Update performance budgets
 */
export const updatePerformanceBudgets = (newBudgets) => {
  Object.assign(PERFORMANCE_BUDGETS, newBudgets);
};

/**
 * Reset performance metrics
 */
export const resetPerformanceMetrics = () => {
  metrics = {
    bundleSizes: {},
    loadTimes: {},
    runtimeMetrics: {},
  };
};

// Development helper functions
export const trackRender = (componentName) => {
  if (isDevelopment) {
    const startTime = performance.now();
    return () => trackComponentRender(componentName, startTime);
  }
  return () => {}; // No-op in production
};

// Bundle size tracking (used in build scripts)
export const trackBundleSize = (name, size) => {
  logBundleSizes({ [name]: size });
};

// Initialize monitoring on import
initPerformanceMonitoring();
