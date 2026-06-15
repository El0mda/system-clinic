"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { mockLogin, mockRegister, type AuthUser, type LoginCredentials, type RegisterData } from "@/lib/auth-data";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

function getInitialUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return null;
    return JSON.parse(raw).user ?? null;
  } catch {
    return null;
  }
}

function getInitialToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return null;
    return JSON.parse(raw).token ?? null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getInitialUser);
  const [token, setToken] = useState<string | null>(getInitialToken);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const result = await mockLogin(credentials);
    setUser(result.user);
    setToken(result.token);
    localStorage.setItem("auth", JSON.stringify(result));
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const result = await mockRegister(data);
    setUser(result.user);
    setToken(result.token);
    localStorage.setItem("auth", JSON.stringify(result));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading: false, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
