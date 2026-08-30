"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface GuestRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export default function GuestRoute({
    children,
    redirectTo = "/",
}: GuestRouteProps) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.replace(redirectTo);
        }
    }, [isAuthenticated, redirectTo, router]);

    if (isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}