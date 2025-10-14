// components/Header.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { LogIn, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/Auth/AuthModal';

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
      />

      <header className="absolute top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl sm:text-2xl font-bold text-white hover:text-blue-200 transition-colors">
                LogiPro
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link href="/services" className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base">
                Our Services
              </Link>
              <Link href="/track" className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base">
                Track Your Delivery
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base">
                Contact Us
              </Link>
            </div>
            
            <div className="hidden md:block">
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 group text-sm"
              >
                <LogIn className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                Log In
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold transition-colors text-xs"
              >
                <LogIn className="h-3 w-3" />
              </Button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/services" 
                  className="text-gray-300 hover:text-white transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Services
                </Link>
                <Link 
                  href="/track" 
                  className="text-gray-300 hover:text-white transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Track Your Delivery
                </Link>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-white transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}