"use client";

import { createContext } from "react";

export interface User {
    username: string;
    email: string;
    user_role?: string;
}

export interface AuthContextType {
    user: User | null;
    jwtToken: string | null;
    isAuthenticated: boolean;

    login: (user: User, jwtToken: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    jwtToken: null,
    isAuthenticated: false,

    login: () => { },
    logout: () => { },
});