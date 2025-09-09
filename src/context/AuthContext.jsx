import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const login = (userData, tokens) => {
    console.warn("🔐 Login function called with:", { userData, tokens });

    if (!userData || !tokens || !tokens.accessToken || !tokens.refreshToken) {
      console.error("❌ Invalid login data:", { userData, tokens });
      return;
    }

    setUser(userData);
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);

    // Store tokens in localStorage for persistence
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    localStorage.setItem("authUser", JSON.stringify(userData));

    console.warn("✅ Tokens stored in localStorage:", {
      accessToken: tokens.accessToken.substring(0, 20) + "...",
      refreshToken: tokens.refreshToken.substring(0, 20) + "...",
      user: userData,
    });
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);

    // Clear all auth data from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("authUser");
  };

  // Debug function to check localStorage
  const checkLocalStorage = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const authUser = localStorage.getItem("authUser");

    console.warn("🔍 Current localStorage state:", {
      accessToken: accessToken ? accessToken.substring(0, 20) + "..." : null,
      refreshToken: refreshToken ? refreshToken.substring(0, 20) + "..." : null,
      authUser: authUser ? JSON.parse(authUser) : null,
    });

    return { accessToken, refreshToken, authUser };
  };

  // On mount, check for persisted auth data
  React.useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedUser = localStorage.getItem("authUser");

    console.warn("🔄 Checking for stored auth data:", {
      hasAccessToken: !!storedAccessToken,
      hasRefreshToken: !!storedRefreshToken,
      hasUser: !!storedUser,
      accessTokenLength: storedAccessToken?.length || 0,
      refreshTokenLength: storedRefreshToken?.length || 0,
    });

    if (storedAccessToken && storedRefreshToken && storedUser) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setUser(JSON.parse(storedUser));
      console.warn("✅ Auth data restored from localStorage");
    } else {
      console.warn("⚠️ No complete auth data found in localStorage");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        login,
        logout,
        checkLocalStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
