// customer-portal/app/layout.tsx
"use client";

import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// <-- ADD THIS IMPORT -->
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ['400', '500', '600', '700', '800']
});

// Metadata moved to app/head.tsx or individual pages since this is now a client component

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <-- WRAP THE CONTENT WITH AuthProvider --> */}
          <AuthProvider>
            <div className="flex flex-col min-h-screen">

              <Header />

              <main className="flex-grow">
                {children}
              </main>

              <Footer />

            </div>
          </AuthProvider>
          {/* <-- AuthProvider end --> */}

          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}