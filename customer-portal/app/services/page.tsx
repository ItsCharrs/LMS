// customer-portal/app/services/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Truck, Building2, Package, CheckCircle, ArrowRight } from 'lucide-react';
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

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="fixed inset-0 bg-gradient-to-br from-background to-muted/30 -z-10"></div>

      <div className="relative z-10 flex-grow">
        {/* Clean Page Header */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
              Our Services
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
              Professional logistics solutions for every need.
              <span className="text-primary font-semibold"> Reliable, efficient, and tailored to you.</span>
            </p>
          </div>
        </section>

        {/* Optimized Services List */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="space-y-12">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                    <div className="grid lg:grid-cols-5 items-stretch">
                      {/* Icon section with gradient */}
                      <div className={`lg:col-span-2 flex items-center justify-center p-8 bg-gradient-to-br ${service.gradient} relative overflow-hidden ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10 text-center">
                          <service.icon className="h-20 w-20 text-white drop-shadow-md mb-4 transform group-hover:scale-105 transition-transform duration-500" />
                          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                            <h3 className="text-xl font-bold text-white">{service.title}</h3>
                          </div>
                        </div>
                      </div>

                      {/* Text content section */}
                      <div className="lg:col-span-3 p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-2 h-8 bg-gradient-to-b ${service.gradient} rounded-full`}></div>
                          <h2 className="text-2xl font-bold text-foreground">{service.title}</h2>
                        </div>

                        <p className="text-base text-muted-foreground leading-relaxed mb-6">
                          {service.description}
                        </p>

                        <div className="space-y-3">
                          <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            What&apos;s Included:
                          </h4>
                          <ul className="grid gap-2">
                            {service.features.map((feature, fIndex) => (
                              <li key={fIndex} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors group/feature">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                  <CheckCircle className="h-3 w-3 text-primary" />
                                </div>
                                <span className="text-sm text-foreground group-hover/feature:text-primary transition-colors">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-8 pt-6 border-t border-border">
                          <Button className={`bg-gradient-to-r ${service.gradient} hover:scale-105 transform transition-all duration-300 border-0 text-white font-bold py-3 px-6 rounded-lg shadow-md text-sm`}>
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
            <div className="bg-gradient-to-r from-blue-600/10 to-emerald-600/10 backdrop-blur-sm rounded-2xl border border-border shadow-lg p-8 text-center relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-foreground">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
                  Join thousands of satisfied clients who trust us with their moves and deliveries.
                  Get started with a free, no-obligation quote today.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg group text-base">
                    <Link href="/book">
                      Get Free Quote
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="border-border bg-card hover:bg-muted text-foreground font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-lg text-base">
                    <Link href="/contact">
                      Contact Sales
                    </Link>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
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