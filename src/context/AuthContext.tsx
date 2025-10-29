"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/lib/api-client";

type AuthUser = {
    email: string;
    name: string;
};

type AuthContextValue = {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    error: string | null;
    clearError: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "ecom_auth_state_v1";

type StoredAuthState = {
    token: string;
    user: AuthUser;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
            if (stored) {
                const parsed = JSON.parse(stored) as StoredAuthState;
                if (parsed?.token && parsed?.user) {
                    setToken(parsed.token);
                    setUser(parsed.user);
                }
            }
        } catch (storageError) {
            console.warn("Failed to load auth state", storageError);
        } finally {
            setLoading(false);
        }
    }, []);

    const persist = useCallback((state: StoredAuthState | null) => {
        if (typeof window === "undefined") return;
        if (state) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } else {
            window.localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiRequest<{ token: string; user: AuthUser }>("/auth/login", {
                method: "POST",
                data: { email, password },
            });

            setToken(response.token);
            setUser(response.user);
            persist({ token: response.token, user: response.user });
        } catch (loginError) {
            const message = loginError instanceof Error ? loginError.message : "Unable to login";
            setError(message);
            throw loginError;
        } finally {
            setLoading(false);
        }
    }, [persist]);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        persist(null);
    }, [persist]);

    const clearError = useCallback(() => setError(null), []);

    const value = useMemo<AuthContextValue>(() => ({
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: Boolean(token),
        error,
        clearError,
    }), [user, token, loading, login, logout, error, clearError]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}
