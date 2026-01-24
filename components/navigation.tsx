'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif text-lg">✦</span>
            </div>
            <span className="font-serif text-xl font-semibold text-foreground hidden sm:inline">Vaidya</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-sm text-muted-foreground hover:text-foreground transition">
              Services
            </Link>
            <Link href="#doctors" className="text-sm text-muted-foreground hover:text-foreground transition">
              Doctors
            </Link>
            <Link href="#telemedicine" className="text-sm text-muted-foreground hover:text-foreground transition">
              Telemedicine
            </Link>
            <Link href="#products" className="text-sm text-muted-foreground hover:text-foreground transition">
              Products
            </Link>
          </div>

          {/* CTA & Cart */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:inline-flex px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition">
              Book Appointment
            </button>
            <button className="relative p-2 hover:bg-muted rounded-full transition">
              <ShoppingBag className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-full transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-in fade-in duration-200">
            <Link href="#services" className="block text-sm text-muted-foreground hover:text-foreground px-2 py-2">
              Services
            </Link>
            <Link href="#doctors" className="block text-sm text-muted-foreground hover:text-foreground px-2 py-2">
              Doctors
            </Link>
            <Link href="#telemedicine" className="block text-sm text-muted-foreground hover:text-foreground px-2 py-2">
              Telemedicine
            </Link>
            <Link href="#products" className="block text-sm text-muted-foreground hover:text-foreground px-2 py-2">
              Products
            </Link>
            <button className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition">
              Book Now
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
