import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

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
			<body className={`${inter.variable} min-h-screen bg-slate-50 antialiased`}>
				{children}
			</body>
		</html>
	);
}