"use client";

import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";


export default function DashboardPage() {
    const { user } = useAuth()

    return (
        <ProtectedRoute>
            <div className="text-black" >
                Hello
            </div>
        </ProtectedRoute>
    )
}