import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreelanceHub - Freelancer Dashboard",
  description:
    "Manage your freelance business with invoices, projects, and AI-powered proposals",
  generator: "Vidhi THakur",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex-1 overflow-hidden">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
