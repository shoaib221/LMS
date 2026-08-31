import type { ReactNode } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({
    children,
}: PublicLayoutProps) {
    return (
        <>


            <main className="min-h-[calc(100vh-80px)] bg-slate-50">
                {children}
            </main>

            <Footer />
        </>
    );
}