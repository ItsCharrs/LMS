// customer-portal/components/Footer.tsx
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card text-muted-foreground border-t border-border mt-auto">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Column 1: Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">S&S</span>
              </div>
              <span className="text-2xl font-bold text-foreground">S&S Logistics</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Your trusted partner for professional logistics and transportation services. We deliver reliability, efficiency, and peace of mind.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors duration-300 block py-1">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors duration-300 block py-1">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-primary transition-colors duration-300 block py-1">
                  Track Delivery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors duration-300 block py-1">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider">Our Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <p className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-default py-1">
                  Freight Shipping
                </p>
              </li>
              <li>
                <p className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-default py-1">
                  Supply Chain
                </p>
              </li>
              <li>
                <p className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-default py-1">
                  Warehousing
                </p>
              </li>
              <li>
                <p className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-default py-1">
                  Last-Mile Delivery
                </p>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider">Contact Info</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-primary group-hover:text-emerald-500 transition-colors duration-300" />
                <span className="group-hover:text-primary transition-colors duration-300">
                  123 Logistics Avenue, Suite 100<br />
                  Metropolis, USA 12345
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary group-hover:text-emerald-500 transition-colors duration-300" />
                <span className="group-hover:text-primary transition-colors duration-300">
                  (123) 456-7890
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary group-hover:text-emerald-500 transition-colors duration-300" />
                <span className="group-hover:text-primary transition-colors duration-300">
                  contact@sslogistics.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} S&S Logistics Inc. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 opacity-70">
            Premium logistics solutions for businesses and individuals
          </p>
        </div>
      </div>
    </footer>
  );
}