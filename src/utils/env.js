export const isDevelopment = () => {
  const hostname = window.location.hostname;
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    import.meta.env.DEV === true
  );
};

export const shouldApplyRateLimits = () => {
  return !isDevelopment();
};
