let deferredPrompt;

export const checkOnlineStatus = () => navigator.onLine;

export const clearAllStorage = () => {
  try {
    // Clear localStorage
    localStorage.clear();
    // Clear sessionStorage
    sessionStorage.clear();
    // Clear IndexedDB if available
    if ("indexedDB" in window) {
      indexedDB.databases?.().then((databases) => {
        databases.forEach((db) => {
          indexedDB.deleteDatabase(db.name);
        });
      });
    }
    // Clear all caches
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
  } catch {
    // Silent fail
  }
};

export const setupPWAListeners = () => {
  // Clear storage on page load
  clearAllStorage();

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
