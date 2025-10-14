// components/Header.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { LogIn, Menu, X, Truck, Home } from 'lucide-react';
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
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-black text-white hover:text-blue-200 transition-colors group">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="h-4 w-4 text-white" />
                </div>
                <span>LogiPro</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link 
                href="/" 
                className="text-white hover:text-blue-300 transition-all duration-300 font-semibold text-sm lg:text-base px-4 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20 flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link 
                href="/services" 
                className="text-white hover:text-blue-300 transition-all duration-300 font-semibold text-sm lg:text-base px-4 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
              >
                Our Services
              </Link>
              <Link 
                href="/track" 
                className="text-white hover:text-blue-300 transition-all duration-300 font-semibold text-sm lg:text-base px-4 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
              >
                Track Your Delivery
              </Link>
              <Link 
                href="/contact" 
                className="text-white hover:text-blue-300 transition-all duration-300 font-semibold text-sm lg:text-base px-4 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
              >
                Contact Us
              </Link>
            </div>
            
            {/* Desktop Login Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 group"
              >
                <LogIn className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                Log In
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Mobile Login Button */}
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-3 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <LogIn className="h-4 w-4" />
                <span className="ml-1 text-xs">Login</span>
              </Button>
              
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl">
              <div className="flex flex-col space-y-2 p-4">
                <Link 
                  href="/" 
                  className="text-white hover:text-blue-300 transition-all duration-300 font-semibold py-3 px-4 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20 text-center flex items-center justify-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link 
                  href="/services" 
                  className="text-white hover:text-blue-300 transition-all duration-300 font-semibold py-3 px-4 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Services
                </Link>
                <Link 
                  href="/track" 
                  className="text-white hover:text-blue-300 transition-all duration-300 font-semibold py-3 px-4 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Track Your Delivery
                </Link>
                <Link 
                  href="/contact" 
                  className="text-white hover:text-blue-300 transition-all duration-300 font-semibold py-3 px-4 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20 text-center"
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