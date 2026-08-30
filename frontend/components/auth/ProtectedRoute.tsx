"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export default function ProtectedRoute({
    children,
    redirectTo = "/login",
}: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace(redirectTo);
        }
    }, [isAuthenticated, redirectTo, router]);

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}