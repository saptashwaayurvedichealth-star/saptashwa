'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="mb-12 pb-12 border-b border-background/20">
          <div className="max-w-2xl">
            <h3 className="font-serif text-2xl font-light mb-3">
              Get wellness insights delivered
            </h3>
            <p className="text-background/70 mb-6">
              Subscribe to our newsletter for exclusive health tips and product launches
            </p>
            <div className="flex gap-3 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg font-medium hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/logo.webp" 
                alt="Sapthashwa Logo" 
                className="w-24 h-24 object-contain mix-blend-screen"
              />
            </div>
            <h4 className="font-serif text-xl font-bold text-background mb-2">Sapthashwa</h4>
            <p className="text-background/70 text-sm leading-relaxed">
              Premium wellness blending Ayurveda with modern medicine
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li><Link href="#" className="hover:text-background transition">Ayurvedic Care</Link></li>
              <li><Link href="#" className="hover:text-background transition">Modern Medicine</Link></li>
              <li><Link href="#" className="hover:text-background transition">Telemedicine</Link></li>
              <li><Link href="#" className="hover:text-background transition">Wellness Products</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li><Link href="#" className="hover:text-background transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-background transition">Doctors</Link></li>
              <li><Link href="#" className="hover:text-background transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-background transition">Blog</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li><Link href="#" className="hover:text-background transition">Contact</Link></li>
              <li><Link href="#" className="hover:text-background transition">FAQ</Link></li>
              <li><Link href="#" className="hover:text-background transition">Privacy</Link></li>
              <li><Link href="#" className="hover:text-background transition">Terms</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+91 97399 91801</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>info@Sapthashwa.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-background/60">
          <p>&copy; 2026 Sapthashwa. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-background transition">Facebook</Link>
            <Link href="#" className="hover:text-background transition">Instagram</Link>
            <Link href="#" className="hover:text-background transition">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
