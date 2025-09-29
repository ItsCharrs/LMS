// frontend/context/AuthContext.tsx

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import apiClient from '@/lib/api'; // <-- 1. Import our new apiClient
import { useRouter } from 'next/navigation'; // <-- 2. Import useRouter for redirects

// Define a type for our backend user data
interface BackendUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  firebaseUser: User | null;
  backendUser: BackendUser | null; // <-- 3. Add state for our backend user
  loading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [backendUser, setBackendUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      // TODO: Here we should check for an existing session with our backend
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      if (result.user) {
        const token = await result.user.getIdToken();
        
        const backendResponse = await apiClient.post('/auth/firebase/', { token });

        // 4. Store the user data and set the auth token for future requests
        setBackendUser(backendResponse.data.user);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${backendResponse.data.access}`;

        // Redirect to the dashboard after successful login
        router.push('/dashboard'); 
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle logout/cleanup in case of backend failure
      signOut(auth);
      setBackendUser(null);
      delete apiClient.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    signOut(auth);
    setBackendUser(null);
    delete apiClient.defaults.headers.common['Authorization'];
    router.push('/login');
  };

  const value = { firebaseUser, backendUser, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};