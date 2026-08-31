"use client";

import { useAuth } from "@/hooks/useAuth";

import StudentDashboard from "@/components/dashboard/student/index";
import InstructorDashboard from "@/components/dashboard/instructor/index";


export default function DashboardPage() {

    const { user } = useAuth();


    if (!user) {
        return null;
    }


    switch (user.user_role) {

        case "student":
            return <StudentDashboard />;
        case "instructor":
            return <InstructorDashboard />;


        default:
            return (
                <div>
                    Invalid user role
                </div>
            );
    }
}