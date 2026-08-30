import type { Metadata } from "next";

import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import AuthListener from "@/components/auth/AuthListener";



export const metadata: Metadata = {
	title: {
		default: "LMS",
		template: "%s | LMS",
	},
	description:
		"A modern Learning Management System built with Next.js and Strapi.",
	keywords: [
		"LMS",
		"Learning Management System",
		"Next.js",
		"Strapi",
		"Education",
		"Courses",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`min-h-screen bg-slate-50 antialiased`}>
				<AuthProvider>
					<AuthListener />
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}

