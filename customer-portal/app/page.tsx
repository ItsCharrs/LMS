// customer-portal/app/page.tsx
import Link from 'next/link';
import { Truck, Building2, Package, ArrowRight, ShieldCheck, Clock, Navigation } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">LogiPro</Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
            <Link href="http://localhost:3000/login" target="_blank" className="hidden md:block bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Client Portal
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/hero-background.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative z-10 px-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
              Seamless Logistics, <br />
              <span className="text-blue-400">Perfectly Delivered.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg lg:text-xl text-gray-200">
              Your trusted partner for professional moving and on-demand delivery services. Experience reliability and peace of mind.
            </p>
            <div className="mt-10">
              <Link href="/book" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-transform hover:scale-105 inline-block">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-base font-semibold text-blue-600 uppercase">Our Services</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Solutions for Every Scale
              </p>
            </div>
            <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-8 rounded-xl border border-gray-200"><Truck className="h-10 w-10 text-blue-600 mb-4" /><h3 className="text-xl font-semibold text-gray-900">Residential Moving</h3><p className="mt-2 text-gray-600">Expert handling for a stress-free move to your new home.</p></div>
              <div className="p-8 rounded-xl border border-gray-200"><Building2 className="h-10 w-10 text-blue-600 mb-4" /><h3 className="text-xl font-semibold text-gray-900">Office Relocation</h3><p className="mt-2 text-gray-600">Efficient and organized moving services to minimize business downtime.</p></div>
              <div className="p-8 rounded-xl border border-gray-200"><Package className="h-10 w-10 text-blue-600 mb-4" /><h3 className="text-xl font-semibold text-gray-900">Specialized Deliveries</h3><p className="mt-2 text-gray-600">From critical pallets to urgent parcels, we guarantee timely and secure delivery.</p></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-base font-semibold text-blue-600 uppercase">Why Choose Us?</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                A Superior Delivery Experience
              </p>
            </div>
            <div className="mt-20 max-w-5xl mx-auto grid gap-12 md:grid-cols-3">
              <div className="text-center"><ShieldCheck className="h-12 w-12 text-blue-600 mx-auto mb-4" /><h3 className="text-lg font-semibold">Fully Insured</h3><p className="mt-1 text-gray-600">Your items are protected. All services are fully insured for your peace of mind.</p></div>
              <div className="text-center"><Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" /><h3 className="text-lg font-semibold">On-Time Guarantee</h3><p className="mt-1 text-gray-600">We value your time. Our logistics planning ensures we meet our schedules, every time.</p></div>
              <div className="text-center"><Navigation className="h-12 w-12 text-blue-600 mx-auto mb-4" /><h3 className="text-lg font-semibold">Real-Time Tracking</h3><p className="mt-1 text-gray-600">Watch your delivery move on a live map from start to finish with our tracking portal.</p></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="container mx-auto py-8 px-6 text-center">
          <p>&copy; {new Date().getFullYear()} LogiPro Logistics Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}