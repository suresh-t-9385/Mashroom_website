import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ff_user");
      const token = localStorage.getItem("ff_token");
      if (stored && token) setUser(JSON.parse(stored));
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, []);

  const persist = ({ token, user: u }) => {
    // NOTE: For production, prefer httpOnly cookies issued by Spring Boot.
    localStorage.setItem("ff_token", token);
    localStorage.setItem("ff_user", JSON.stringify(u));
    setUser(u);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAdmin: user?.role === "admin",
      login: async (creds) => {
        const res = await authService.login(creds);
        persist(res);
        return res.user;
      },
      register: async (data) => {
        const res = await authService.register(data);
        persist(res);
        return res.user;
      },
      logout: () => {
        localStorage.removeItem("ff_token");
        localStorage.removeItem("ff_user");
        setUser(null);
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
