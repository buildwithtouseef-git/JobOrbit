import { useCallback, useEffect, useMemo, useState } from "react";
import AuthContext from "./AuthContext";
import authService from "../services/auth.service";
import "../../../shared/api/axiosInterceptor";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const clearAuth = useCallback(() => {
        localStorage.removeItem("accessToken");
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    const login = useCallback((userData, accessToken) => {
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
        }

        setUser(userData);
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } catch {
            // Ignore logout failures and clear state locally.
        } finally {
            clearAuth();
        }
    }, [clearAuth]);

    const initializeAuth = useCallback(async () => {
        try {
            const response = await authService.getCurrentUser();
            const authUser = response.data?.data?.user ?? response.data?.user;
            setUser(authUser);
            setIsAuthenticated(true);
        } catch {
            try {
                const refreshResponse = await authService.refreshToken();
                const newToken = refreshResponse.data?.data?.accessToken;

                if (newToken) {
                    localStorage.setItem("accessToken", newToken);
                    const profileResponse = await authService.getCurrentUser();
                    const authUser = profileResponse.data?.data?.user ?? profileResponse.data?.user;
                    setUser(authUser);
                    setIsAuthenticated(true);
                    return;
                }
            } catch {
                // Fall back to clearing auth state.
            }

            clearAuth();
        } finally {
            setIsLoading(false);
        }
    }, [clearAuth]);

    useEffect(() => {
        let isMounted = true;

        queueMicrotask(async () => {
            if (isMounted) {
                await initializeAuth();
            }
        });

        return () => {
            isMounted = false;
        };
    }, [initializeAuth]);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated,
            isLoading,
            setUser,
            setIsLoading,
            login,
            logout,
            clearAuth,
        }),
        [user, isAuthenticated, isLoading, login, logout, clearAuth]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
