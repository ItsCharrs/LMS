// components/auth/AuthModal.tsx

'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
  const [currentView, setCurrentView] = useState<'login' | 'register'>(initialView);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - click to close */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Glass morphism modal */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Close button - Fixed with proper z-index and padding */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Background decorative elements */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500 rounded-full opacity-20 filter blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500 rounded-full opacity-20 filter blur-3xl"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="p-8 text-center border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">
              {currentView === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-white/70 mt-2">
              {currentView === 'login' 
                ? 'Sign in to your account' 
                : 'Join thousands of satisfied customers'
              }
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            {currentView === 'login' ? (
              <LoginForm onSwitchToRegister={() => setCurrentView('register')} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setCurrentView('login')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}