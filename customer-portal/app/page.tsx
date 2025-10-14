// customer-portal/app/page.tsx
import Link from 'next/link';
import { Truck, Building2, Package, ArrowRight, ShieldCheck, Clock, Navigation, CheckCircle, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="relative bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/hero-background.jpg')" }}></div>
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full opacity-20 filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full opacity-20 filter blur-3xl animate-blob animation-delay-4000"></div>

        <div className="relative z-10 px-6 w-full max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-tight">
            Modern Logistics, <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Brilliantly Executed.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg lg:text-xl text-gray-200 leading-relaxed">
            Experience the future of delivery and moving. We blend cutting-edge technology with an unwavering commitment to premium service.
          </p>
          <div className="mt-10">
            <Link href="/book">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl group">
                Get a Free Quote
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/hero-background.jpg')" }}></div>
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-2 border border-white/20 mb-4">
              <span className="text-sm font-semibold text-blue-300">TRUSTED BY THOUSANDS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Why Customers Choose Us
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their most important moves and deliveries
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white mb-2">10,000+</div>
              <div className="text-sm text-gray-300">Happy Customers</div>
            </div>

            <div className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-2xl font-black text-white mb-2">50,000+</div>
              <div className="text-sm text-gray-300">Successful Deliveries</div>
            </div>

            <div className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white mb-2">100%</div>
              <div className="text-sm text-gray-300">Insured & Protected</div>
            </div>

            <div className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-6 w-6 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-white mb-2">24/7</div>
              <div className="text-sm text-gray-300">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative">
        {/* Background */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/hero-background.jpg')" }}></div>
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-2 border border-white/20 mb-4">
              <span className="text-sm font-semibold text-blue-300">OUR SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Solutions for Every Scale
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Professional logistics services tailored to your specific needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Residential Moving Card */}
            <div className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-blue-500/30">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Residential Moving</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Expert handling for a stress-free move to your new home with our professional team and secure vehicles.
              </p>
              <ul className="space-y-2">
                {["Full packing services", "Furniture protection", "Secure transportation", "Timely delivery"].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Office Relocation Card */}
            <div className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-green-500/30">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Office Relocation</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Efficient and organized moving services to minimize business downtime and ensure smooth transitions.
              </p>
              <ul className="space-y-2">
                {["IT equipment handling", "Minimal disruption", "Flexible scheduling", "Document security"].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Small Deliveries Card */}
            <div className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-orange-500/30">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Small Deliveries</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Fast, secure delivery of documents, parcels, and small pallets with real-time tracking and flexible options.
              </p>
              <ul className="space-y-2">
                {["Same-day delivery", "Small pallets", "Real-time tracking", "Multiple vehicles"].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="outline" className="border-2 border-white/30 bg-white/5 hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-lg">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-lg rounded-full px-6 py-2 border border-blue-500/30 mb-4">
              <span className="text-sm font-semibold text-blue-300">WHY CHOOSE US</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              A Superior Delivery Experience
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              We go above and beyond to ensure your complete satisfaction
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="group text-center bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Fully Insured</h3>
              <p className="text-gray-300 leading-relaxed">
                Your items are protected with comprehensive insurance for complete peace of mind throughout the journey.
              </p>
            </div>

            <div className="group text-center bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">On-Time Guarantee</h3>
              <p className="text-gray-300 leading-relaxed">
                We value your time and maintain strict schedules with our on-time delivery guarantee for every service.
              </p>
            </div>

            <div className="group text-center bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Navigation className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-Time Tracking</h3>
              <p className="text-gray-300 leading-relaxed">
                Watch your delivery move on a live map from start to finish with our advanced real-time tracking system.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}