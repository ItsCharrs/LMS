'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Truck, MapPin, Clock, Package, CheckCircle, ArrowRight } from 'lucide-react';

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
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="fixed inset-0 bg-gradient-to-br from-background to-muted/30 -z-10"></div>

      <div className="relative z-10 flex-grow container mx-auto px-6 py-8 md:py-20 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-2 mb-6">
            <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-primary">LIVE TRACKING</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight">
            Track Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Shipment
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get real-time updates and live location tracking for your delivery. Peace of mind, delivered.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Tracking Form */}
          <div>
            <div className="bg-card rounded-2xl shadow-xl border border-border p-8 transition-shadow hover:shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Enter Tracking Number</h2>
                <p className="text-muted-foreground">
                  Find your Order ID in your booking confirmation email
                </p>
              </div>

              <form onSubmit={handleTrack} className="space-y-6">
                <div>
                  <label htmlFor="trackingId" className="block text-sm font-medium text-foreground mb-2">
                    Order ID / Tracking Number
                  </label>
                  <Input
                    id="trackingId"
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="e.g., ORD-8921"
                    className="h-14 text-lg border-input bg-background focus:border-primary focus:ring-primary"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg"
                  disabled={!trackingId.trim()}
                >
                  <Search className="mr-2 h-5 w-5" />
                  Track My Delivery
                </Button>
              </form>

              <div className="mt-8 p-4 bg-muted/30 rounded-xl border border-border">
                <p className="text-sm text-foreground">
                  <span className="font-semibold text-foreground">Can&apos;t find your Order ID?</span>
                  <br />
                  Check your confirmation email or contact{' '}
                  <a href="mailto:support@logipro.com" className="text-primary hover:underline">
                    support@logipro.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="lg:order-2 space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">What You&apos;ll See</h3>

            {[
              {
                icon: MapPin,
                title: 'Real-Time Location',
                description: 'GPS tracking shows exactly where your delivery is right now',
                color: 'blue'
              },
              {
                icon: Clock,
                title: 'Accurate ETA',
                description: 'Live estimated arrival time that updates as conditions change',
                color: 'green'
              },
              {
                icon: Truck,
                title: 'Driver Details',
                description: 'View your driver\'s name, vehicle info, and contact button',
                color: 'orange'
              },
              {
                icon: CheckCircle,
                title: 'Status Timeline',
                description: 'Complete journey from pickup to delivery with timestamps',
                color: 'purple'
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              // Map specific colors or use theme tokens? Feature colors should likely persist but use theme-aware backgrounds
              // Or map them to semantic colors if possible.
              // Let's keep them colorful but softer in dark mode if needed.
              // bg-blue-100 -> bg-blue-500/10 in dark? NO, keep bg-blue-100 usually looks bad in dark.
              // Better: `bg-${color}-500/10 text-${color}-600 dark:text-${color}-400`
              const colorClasses = {
                blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                green: 'bg-green-500/10 text-green-600 dark:text-green-400',
                orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
                purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
              };

              return (
                <div key={index} className="flex gap-4 p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
                  <div className={`flex-shrink-0 h-12 w-12 rounded-xl ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white shadow-lg">
              <h4 className="font-semibold mb-2">Need Help?</h4>
              <p className="text-sm text-blue-100 mb-4">
                Our support team is available 24/7 to assist you with tracking or delivery questions.
              </p>
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 border-0">
                Contact Support <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span>Live Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
              <span>Secure Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}