"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProfilePage() {
    const {
        user,
        isAuthenticated,
    } = useAuth();

    const router = useRouter();
    const { logout } = useAuth()





    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 px-6 py-10">

                <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow">

                    <h1 className="mb-6 text-2xl font-bold text-gray-900">
                        Profile
                    </h1>


                    <div className="space-y-4">

                        <div>
                            <p className="text-sm text-gray-500">
                                Username
                            </p>

                            <p className="text-lg font-medium text-gray-900">
                                {user?.username}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="text-lg font-medium text-gray-900">
                                {user?.email}
                            </p>
                        </div>


                        {user?.role && (
                            <div>
                                <p className="text-sm text-gray-500">
                                    Role
                                </p>

                                <p className="text-lg font-medium capitalize text-gray-900">
                                    {user.role}
                                </p>
                            </div>
                        )}

                    </div>

                    <button onClick={logout} >
                        Logout
                    </button>

                </div>

            </div>
        </ProtectedRoute>
    );
}