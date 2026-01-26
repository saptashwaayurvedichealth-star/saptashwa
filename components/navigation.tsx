'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Treatments', href: '/treatments' },
    { name: 'Products', href: '/products' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <a href="tel:+919739991801" className="flex items-center space-x-1 hover:underline">
              <Phone size={14} />
              <span className="hidden sm:inline">+91 97399 91801</span>
            </a>
            <a href="mailto:info@Sapthashwa.com" className="flex items-center space-x-1 hover:underline">
              <Mail size={14} />
              <span className="hidden sm:inline">info@Sapthashwa.com</span>
            </a>
          </div>
          <div className="hidden md:block">
            Mon - Fri: 9:00 AM - 6:00 PM
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/logo.webp" 
                alt="Sapthashwa Logo" 
                className="w-20 h-20 object-contain"
              />
              <span className="font-serif text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Sapthashwa
              </span>
            </Link>

            {/* Desktop Menu - Centered */}
            <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-semibold text-gray-900 hover:text-primary transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/appointment">
                <Button className="bg-primary hover:opacity-90">
                  Book Appointment
                </Button>
              </Link>
              <Link href="#enquiry">
                <Button variant="outline">
                  Enquiry
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-muted rounded-full transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 px-4 text-base font-semibold text-gray-900 hover:text-primary hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 mt-4">
              <Link href="/appointment">
                <Button className="w-full">Book Appointment</Button>
              </Link>
              <Link href="#enquiry">
                <Button variant="outline" className="w-full">Enquiry</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
