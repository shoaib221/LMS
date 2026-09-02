import { ReactNode } from "react";

import CourseHeader from "@/components/instructed-course/CourseHeader";
import CourseSidebar from "@/components/instructed-course/CourseSidebar";

interface LayoutProps {
    children: ReactNode;
}

export default function CourseLayout({
    children,
}: LayoutProps) {
    return (
        <div className="flex h-screen flex-col overflow-hidden bg-slate-100">

            {/* Top Header */}
            <CourseHeader />

            {/* Main */}
            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar */}
                <CourseSidebar courseId="1" />

                {/* Content */}
                <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
                    {children}
                </main>

            </div>

        </div>
    );
}