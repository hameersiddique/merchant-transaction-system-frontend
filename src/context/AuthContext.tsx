"use client";

import { authService } from "@/app/register/services/auth.service";
import { STORAGE_KEYS } from "@/lib/constants";
import { storage } from "@/lib/utils";
import { deleteCookie, getTokenMaxAge, setCookie } from "@/lib/utils/jwt";
import {
  AuthContextType,
  AuthResponseData,
  LoginCredentials,
  Merchant,
  RegisterData,
} from "@/types/auth.types";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_ACCESS_TOKEN_EXPIRY = 60 * 60 * 24 * 7; // 7 days
const DEFAULT_REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 30; // 30 days

export function AuthProvider({ children }: { children: ReactNode }) {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = () => {
    try {
      const token = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
      const storedMerchant = storage.get<Merchant>(STORAGE_KEYS.MERCHANT);

      if (token && storedMerchant) {
        setMerchant(storedMerchant);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const loginResponse = await authService.login(credentials);

      const accessToken =
        loginResponse.access_token ||
        (loginResponse as AuthResponseData).access_token;
      const refreshToken =
        loginResponse.refresh_token ||
        (loginResponse as AuthResponseData).refresh_token;
      const merchantData = loginResponse.merchant;

      if (!accessToken || !merchantData) {
        throw new Error("Invalid response structure from login API");
      }

      storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      if (refreshToken) {
        storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      }
      storage.set(STORAGE_KEYS.MERCHANT, merchantData);

      const accessTokenMaxAge =
        getTokenMaxAge(accessToken) || DEFAULT_ACCESS_TOKEN_EXPIRY;
      const refreshTokenMaxAge = refreshToken
        ? getTokenMaxAge(refreshToken) || DEFAULT_REFRESH_TOKEN_EXPIRY
        : DEFAULT_REFRESH_TOKEN_EXPIRY;

      setCookie("access_token", accessToken, accessTokenMaxAge);
      if (refreshToken) {
        setCookie("refresh_token", refreshToken, refreshTokenMaxAge);
      }

      setMerchant(merchantData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await authService.register(data);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    storage.remove(STORAGE_KEYS.MERCHANT);

    deleteCookie("access_token");
    deleteCookie("refresh_token");

    setMerchant(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    merchant,
    login,
    register,
    logout,
    isAuthenticated,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
