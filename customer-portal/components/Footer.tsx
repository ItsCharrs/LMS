// customer-portal/components/Footer.tsx
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S&S</span>
              </div>
              <span className="text-2xl font-bold text-white">S&S Logistics</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Your trusted partner for professional logistics and transportation services. We deliver reliability, efficiency, and peace of mind.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="hover:text-emerald-300 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-300 transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-emerald-300 transition-colors duration-300">
                  Track Delivery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-300 transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Our Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <p className="text-gray-400 hover:text-emerald-300 transition-colors duration-300 cursor-default">
                  Freight Shipping
                </p>
              </li>
              <li>
                <p className="text-gray-400 hover:text-emerald-300 transition-colors duration-300 cursor-default">
                  Supply Chain
                </p>
              </li>
              <li>
                <p className="text-gray-400 hover:text-emerald-300 transition-colors duration-300 cursor-default">
                  Warehousing
                </p>
              </li>
              <li>
                <p className="text-gray-400 hover:text-emerald-300 transition-colors duration-300 cursor-default">
                  Last-Mile Delivery
                </p>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Contact Info</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                <span className="group-hover:text-emerald-300 transition-colors duration-300">
                  123 Logistics Avenue, Suite 100<br />
                  Metropolis, USA 12345
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="h-5 w-5 flex-shrink-0 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                <span className="group-hover:text-emerald-300 transition-colors duration-300">
                  (123) 456-7890
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="h-5 w-5 flex-shrink-0 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                <span className="group-hover:text-emerald-300 transition-colors duration-300">
                  contact@sslogistics.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} S&S Logistics Inc. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Premium logistics solutions for businesses and individuals
          </p>
        </div>
      </div>
    </footer>
  );
}