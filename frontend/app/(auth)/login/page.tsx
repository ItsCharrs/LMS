// frontend/app/(auth)/login/page.tsx

"use client"; // This component has user interaction

import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to LogiPro</h1>
        <button
          onClick={login}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}