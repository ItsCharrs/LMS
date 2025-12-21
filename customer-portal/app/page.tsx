import Link from 'next/link';
import { Truck, Building2, Package, ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuoteCalculator } from '@/components/QuoteCalculator';
import { TrustSignals } from '@/components/TrustSignals';
import FleetShowcase from '@/components/FleetShowcase';
import { ProcessSteps } from '@/components/ProcessSteps';

export default function HomePage() {
  return (
    <div className="relative bg-background min-h-screen">
      {/* Hero Section with Quote Calculator */}
      <section className="relative bg-gradient-to-br from-background via-muted/30 to-background py-20 lg:py-32 overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Value Proposition */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-8 border border-primary/20">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-sm font-semibold text-primary">Now Serving 150+ Cities Nationwide</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.1] mb-6">
                Moving & Freight,{' '}
                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-500 bg-clip-text text-transparent">
                  Reimagined.
                </span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                The premium choice for residential moving and commercial logistics. We combine white-glove service with real-time technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button asChild size="lg" className="h-14 px-8 text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                  <Link href="/book">Get Instant Quote</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold border-2 hover:bg-muted/50">
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>Fully Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>Real-Time Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Right: Quote Calculator */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
              <div className="relative">
                <QuoteCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <ProcessSteps />

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-4">
              Solutions for Every Scale
            </h2>
            <p className="text-lg text-muted-foreground">
              Tailored logistics services delivering precision and care
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Residential Moving Card */}
            <div className="group bg-card rounded-3xl border border-border p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Residential Moving</h3>
              <p className="text-muted-foreground leading-relaxed mb-8 min-h-[4.5rem]">
                Premium white-glove moving services. We handle your belongings with the care they deserve, from packing to unboxing.
              </p>
              <ul className="space-y-3 mb-8">
                {["Full Packing Service", "Premium Furniture Protection", "Climate-Controlled Transport", "Dedicated Move Coordinator"].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Link href="/book">Book a Move <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>

            {/* Commercial Freight Card */}
            <div className="group bg-card rounded-3xl border border-border p-8 shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/20">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Commercial Freight</h3>
              <p className="text-muted-foreground leading-relaxed mb-8 min-h-[4.5rem]">
                Enterprise-grade freight solutions for businesses. Streamline your supply chain with our reliable services.
              </p>
              <ul className="space-y-3 mb-8">
                {["LTL & FTL Options", "Pallet Management", "Warehouse Solutions", "Fleet Monitoring"].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Link href="/book">Request Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>

            {/* Special Services Card */}
            <div className="group bg-card rounded-3xl border border-border p-8 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/20">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Specialty Services</h3>
              <p className="text-muted-foreground leading-relaxed mb-8 min-h-[4.5rem]">
                Customized solutions for unique shipping needs. From fragile items to time-sensitive deliveries.
              </p>
              <ul className="space-y-3 mb-8">
                {["Same-Day Delivery", "Fragile Item Handling", "Temperature Control", "Custom Packaging"].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Link href="/book">Contact Us <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <FleetShowcase />

      {/* Trust Signals / Why Choose Us */}
      <TrustSignals />
    </div>
  );
}