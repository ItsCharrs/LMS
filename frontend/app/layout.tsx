import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from 'react-hot-toast'; // <-- Import Toaster

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LogiPro",
  description: "Logistics Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-center" /> {/* <-- Add Toaster component */}
        </AuthProvider>
      </body>
    </html>
  );
}