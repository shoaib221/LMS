"use client";

import { useState } from "react";
import { AuthContext, User } from "@/context/AuthContext";

interface AuthProviderProps {
    children: React.ReactNode;
}

export default function AuthProvider({
    children,
}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window === "undefined") {
            return null;
        }

        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [jwtToken, setJwtToken] = useState<string | null>(() => {
        if (typeof window === "undefined") {
            return null;
        }

        return localStorage.getItem("jwtToken");
    });

    const login = (user: User, jwtToken: string) => {
        setUser(user);
        setJwtToken(jwtToken);

        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        setJwtToken(null);

        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                jwtToken,
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}