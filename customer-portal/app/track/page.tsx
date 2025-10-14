// customer-portal/app/track/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Truck, MapPin, Clock, Shield, Package } from 'lucide-react';

export default function TrackLandingPage() {
  const [trackingId, setTrackingId] = useState('');
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      router.push(`/track/${trackingId.trim()}`);
    }
  };

  return (
    <div className="relative bg-gray-900 text-white min-h-screen pt-20 pb-8">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/hero-background.jpg')" }}></div>
      <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm"></div>

      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow animation-delay-2000"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20 mb-6">
              <Truck className="h-6 w-6 text-blue-300" />
              <span className="text-sm font-semibold text-blue-300">REAL-TIME TRACKING</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
              Track Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Delivery</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Get live updates and real-time location tracking for your shipment. Peace of mind delivered.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Feature Cards */}
            <div className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Live Location</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Real-time GPS tracking shows exactly where your delivery is at all times
              </p>
            </div>

            <div className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">ETA Updates</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Accurate estimated arrival times that update in real-time as conditions change
              </p>
            </div>

            <div className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Secure Tracking</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your shipment details are protected with enterprise-grade security
              </p>
            </div>
          </div>

          {/* Tracking Card */}
          <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
            <CardHeader className="pb-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-4">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Enter Tracking Number</CardTitle>
                <CardDescription className="text-gray-300 pt-2 text-base">
                  Find your Job ID on your booking confirmation email or receipt
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleTrack} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="trackingId" className="text-sm font-medium text-gray-300 block text-left">
                    Job ID / Tracking Number
                  </label>
                  <Input
                    id="trackingId"
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter your Job ID (e.g., 2cead355-1234-5678-9abc-def123456789)"
                    className="bg-white/5 border-white/20 placeholder:text-gray-400 h-14 text-lg flex-grow rounded-xl focus:bg-white/10 transition-colors"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 h-14 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg group"
                  disabled={!trackingId.trim()}
                >
                  <Search className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" /> 
                  Track Delivery
                </Button>
              </form>

              {/* Help Text */}
              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  Can&apos;t find your Job ID?
                </h4>
                <p className="text-xs text-gray-400">
                  Check your booking confirmation email or contact our support team at 
                  <span className="text-blue-300"> support@logipro.com</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Live Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>24/7 Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}