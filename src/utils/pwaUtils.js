let deferredPrompt;

export const checkOnlineStatus = () => navigator.onLine;

export const setupPWAListeners = () => {
  window.addEventListener("online", checkOnlineStatus);
  window.addEventListener("offline", checkOnlineStatus);
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
};

export const handleOnlineStatusChange = () => checkOnlineStatus();

export const installPWA = async () => {
  if (!deferredPrompt) return false;
  try {
    await deferredPrompt.prompt();
    deferredPrompt = null;
    return true;
  } catch {
    return false;
  }
};

export const isPWAInstallable = () => !!deferredPrompt;

export const clearPWAPrompt = () => {
  deferredPrompt = null;
};
