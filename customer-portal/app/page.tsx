// customer-portal/app/page.tsx
import Link from 'next/link';
import { Truck, Building2, Package, ArrowRight, ShieldCheck, Clock, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

// A new, reusable component for our glassmorphism cards
const GlassCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-lg">
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white/20 mb-6">
      <Icon className="h-8 w-8 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="mt-2 text-gray-300">{children}</p>
  </div>
);

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900"> {/* Set a dark base background */}

      <main className="flex-grow">
        {/* Hero Section with a more dynamic background */}
        <section className="relative flex items-center justify-center text-center min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/hero-background.jpg')" }}>
          <div className="absolute inset-0 bg-black/60"></div>
          {/* Decorative Gradient Blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-20 filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-20 filter blur-3xl animate-blob animation-delay-4000"></div>

          <div className="relative z-10 px-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-lg">
              Modern Logistics, <br />
              <span className="text-blue-400">Brilliantly Executed.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg lg:text-xl text-gray-200 drop-shadow">
              Experience the future of delivery and moving. We blend cutting-edge technology with an unwavering commitment to premium service.
            </p>
            <div className="mt-10">
              <Link href="/book">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 group">
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section with Glassmorphism */}
        <section id="services" className="py-24 relative overflow-hidden">
           {/* Position the background image here */}
           <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/hero-background.jpg')" }}></div>
           <div className="absolute inset-0 bg-black/70"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-base font-semibold text-blue-400 uppercase">Our Services</h2>
              <p className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                Solutions for Every Scale
              </p>
            </div>
            <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <GlassCard icon={Truck} title="Residential Moving">
                Expert handling for a stress-free move to your new home.
              </GlassCard>
              <GlassCard icon={Building2} title="Office Relocation">
                Efficient and organized moving services to minimize business downtime.
              </GlassCard>
              <GlassCard icon={Package} title="Specialized Deliveries">
                From critical pallets to urgent parcels, we guarantee timely and secure delivery.
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Features Section (can remain clean or also be styled) */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-base font-semibold text-blue-600 uppercase">Why Choose Us?</h2>
                <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">A Superior Delivery Experience</p>
            </div>
            <div className="mt-20 max-w-5xl mx-auto grid gap-12 md:grid-cols-3">
              <div className="text-center"><ShieldCheck className="h-12 w-12 text-blue-600 mx-auto mb-4" /><h3 className="text-lg font-semibold">Fully Insured</h3><p className="mt-1 text-gray-600">Your items are protected for your peace of mind.</p></div>
              <div className="text-center"><Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" /><h3 className="text-lg font-semibold">On-Time Guarantee</h3><p className="mt-1 text-gray-600">We value your time and meet our schedules, every time.</p></div>
              <div className="text-center"><Navigation className="h-12 w-12 text-blue-600 mx-auto mb-4" /><h3 className="text-lg font-semibold">Real-Time Tracking</h3><p className="mt-1 text-gray-600">Watch your delivery move on a live map from start to finish.</p></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}