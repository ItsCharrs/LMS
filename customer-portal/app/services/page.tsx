// customer-portal/app/services/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Truck, Building2, Package, CheckCircle, ArrowRight, Shield, Clock, Users } from 'lucide-react';
import React from 'react';

const services = [
  {
    icon: Truck as React.ElementType,
    title: "Residential Moving",
    description: "Expert moving services for apartments and family homes. We handle everything with care, ensuring your belongings arrive safely and on time with our spacious, padded lorries.",
    features: ["Full Packing & Unpacking", "Furniture Assembly", "Secure Lorries", "Experienced Crew"],
    gradient: "from-blue-500 to-cyan-500",
    accent: "blue"
  },
  {
    icon: Building2 as React.ElementType,
    title: "Office Relocation",
    description: "Minimize business downtime with our organized office moving services. We handle IT equipment, furniture, and documents with precision and care.",
    features: ["IT Equipment Migration", "Furniture Setup", "Flexible Scheduling", "Document Security"],
    gradient: "from-green-500 to-emerald-500",
    accent: "green"
  },
  {
    icon: Package as React.ElementType,
    title: "Small Deliveries",
    description: "Perfect for businesses and individuals needing reliable delivery of documents, small parcels, and pallets. Fast, secure delivery with real-time tracking for all your shipping needs.",
    features: [
      "Same-Day & Express Delivery", 
      "Small Business Pallets & Shipments", 
      "Urgent Document & Parcel Delivery", 
      "Real-Time Package Tracking",
      "Flexible Vehicle Selection",
      "Business & Residential Delivery"
    ],
    gradient: "from-orange-500 to-amber-500",
    accent: "orange"
  }
];

const stats = [
  { icon: Users, number: "10,000+", label: "Happy Customers" },
  { icon: Truck, number: "50,000+", label: "Successful Deliveries" },
  { icon: Shield, number: "100%", label: "Insured & Protected" },
  { icon: Clock, number: "24/7", label: "Customer Support" }
];

export default function ServicesPage() {
  return (
    <div className="relative bg-gray-900 text-white min-h-screen">
      {/* Clean Background with Dark Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/hero-background.jpg')" }}></div>
      <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm"></div>
      
      {/* Subtle Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow animation-delay-2000"></div>

      <div className="relative z-10">
        {/* Clean Page Header */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              Our Services
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed">
              Professional logistics solutions for every need. 
              <span className="text-blue-400 font-semibold"> Reliable, efficient, and tailored to you.</span>
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors mb-3">
                    <stat.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="text-xl font-bold text-white">{stat.number}</div>
                  <div className="text-xs text-gray-300 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Optimized Services List */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="space-y-12">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden"
                >
                  {/* Background Glow Effect */}
                  <div className={`absolute -inset-2 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`}></div>
                  
                  <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:scale-[1.01]">
                    <div className="grid lg:grid-cols-5 items-stretch">
                      {/* Icon section with gradient */}
                      <div className={`lg:col-span-2 flex items-center justify-center p-8 bg-gradient-to-br ${service.gradient} relative overflow-hidden ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10 text-center">
                          <service.icon className="h-20 w-20 text-white drop-shadow-lg mb-4 transform group-hover:scale-105 transition-transform duration-500" />
                          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                            <h3 className="text-xl font-bold text-white">{service.title}</h3>
                          </div>
                        </div>
                      </div>

                      {/* Text content section */}
                      <div className="lg:col-span-3 p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-2 h-8 bg-gradient-to-b ${service.gradient} rounded-full`}></div>
                          <h2 className="text-2xl font-bold text-white">{service.title}</h2>
                        </div>
                        
                        <p className="text-base text-gray-300 leading-relaxed mb-6">
                          {service.description}
                        </p>
                        
                        <div className="space-y-3">
                          <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                            What&apos;s Included:
                          </h4>
                          <ul className="grid gap-2">
                            {service.features.map((feature, fIndex) => (
                              <li key={fIndex} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/feature">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                  <CheckCircle className="h-3 w-3 text-green-400" />
                                </div>
                                <span className="text-sm text-gray-200 group-hover/feature:text-white transition-colors">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/10">
                          <Button className={`bg-gradient-to-r ${service.gradient} hover:scale-105 transform transition-all duration-300 border-0 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-sm`}>
                            Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Optimized CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-blue-600/20 to-emerald-600/20 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-8 text-center relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
                  Join thousands of satisfied clients who trust us with their moves and deliveries. 
                  Get started with a free, no-obligation quote today.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Link href="/book">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg group text-base">
                      Get Free Quote 
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="border border-white/30 bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-lg text-base">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  ⚡ Quick Response • 💰 No Hidden Fees • 🛡️ Fully Insured
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}