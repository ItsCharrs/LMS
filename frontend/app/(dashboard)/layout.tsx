// frontend/app/(dashboard)/layout.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { backendUser, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !backendUser) {
      router.push('/login');
    }
  }, [backendUser, loading, router]);

  // While loading, you can show a spinner or a blank screen
  if (loading || !backendUser) {
    return <div>Loading...</div>; // Or a loading spinner component
  }

  // If logged in, render the layout and children
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">LogiPro</h2>
        <nav>
          <ul>
            <li className="mb-2"><a href="/dashboard" className="block p-2 rounded hover:bg-gray-700">Dashboard</a></li>
            {/* We will add more links here */}
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div>Welcome, {backendUser.username}!</div>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </header>
        
        {/* Page Content */}
        <div className="p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}