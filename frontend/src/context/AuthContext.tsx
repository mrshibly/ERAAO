"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  signature_url?: string | null;
  phone?: string | null;
  skill_level?: string | null;
  primary_goal?: string | null;
  organization?: string | null;
  onboarding_completed?: boolean;
  is_active: boolean;
  is_verified: boolean;
  roles: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  login: (token: string, userProfile: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (newToken: string, userProfile: UserProfile) => {
    setToken(newToken);
    setUser(userProfile);
    // Security: Do NOT store sensitive JWT access token in localStorage (XSS prevention).
    // Store non-sensitive user metadata in sessionStorage for tab-isolated quick render.
    try {
      sessionStorage.setItem("user", JSON.stringify(userProfile));
      localStorage.removeItem("token"); // Clean up any legacy localStorage tokens
      localStorage.removeItem("user");
    } catch {
      // Storage unavailable (e.g. private browsing quota)
    }
  };

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    try {
      sessionStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch {
      // Storage unavailable
    }
    // Trigger backend logout to clear HTTPOnly refresh token cookie
    fetch("/api/v1/auth/logout", { method: "POST", credentials: "include" }).catch(() => {});
  }, []);

  const performRefresh = useCallback(async (): Promise<string | null> => {
    try {
      const res = await fetch("/api/v1/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.access_token);
        return data.access_token;
      } else {
        logout();
        return null;
      }
    } catch (e) {
      console.error("Token refresh failed:", e);
      return null;
    }
  }, [logout]);

  useEffect(() => {
    // Clean up any legacy tokens stored in localStorage to prevent token exposure
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch {}

    // Load initial user state from sessionStorage if available
    try {
      const cachedUser = sessionStorage.getItem("user");
      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
      }
    } catch {}

    // Silent background authentication using secure HTTPOnly refresh cookie
    performRefresh().then(async (accessToken) => {
      if (accessToken) {
        try {
          const profileRes = await fetch("/api/v1/users/me", {
            headers: { "Authorization": `Bearer ${accessToken}` },
            credentials: "include"
          });
          if (profileRes.ok) {
            const freshProfile = await profileRes.json();
            setUser(freshProfile);
            try {
              sessionStorage.setItem("user", JSON.stringify(freshProfile));
            } catch {}
          }
        } catch {}
      }
      setLoading(false);
    });
  }, [performRefresh]);

  // Set up token refresh timer before expiry
  useEffect(() => {
    if (!token) return;

    const decoded = parseJwt(token);
    if (!decoded || !decoded.exp) return;

    const expMs = decoded.exp * 1000;
    const delay = expMs - Date.now() - 60000; // Refresh 1 minute before expiry

    if (delay <= 0) {
      performRefresh();
      return;
    }

    const timer = setTimeout(() => {
      performRefresh();
    }, delay);

    return () => clearTimeout(timer);
  }, [token, performRefresh]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
