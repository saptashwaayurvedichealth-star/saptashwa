'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

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
      <motion.div 
        className="bg-blue-600 text-white py-2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-2 sm:gap-0">
          <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap justify-center sm:justify-start">
            <motion.a 
              href="tel:+919739991801" 
              className="flex items-center space-x-1 hover:underline whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
            >
              <Phone size={12} className="sm:size-3.5" />
              <span className="hidden sm:inline">+91 97399 91801</span>
              <span className="sm:hidden">Call</span>
            </motion.a>
            <motion.a 
              href="tel:+916360935065" 
              className="flex items-center space-x-1 hover:underline whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
            >
              <Phone size={12} className="sm:size-3.5" />
              <span className="hidden sm:inline">+91 6360935065</span>
              <span className="sm:hidden">Call</span>
            </motion.a>
            <motion.a 
              href="mailto:Saptashwaayurvedichealth@gmail.com" 
              className="flex items-center space-x-1 hover:underline whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
            >
              <Mail size={12} className="sm:size-3.5" />
              <span className="hidden sm:inline">Saptashwaayurvedichealth@gmail.com</span>
              <span className="sm:hidden">Email</span>
            </motion.a>
          </div>
          <div className="text-xs sm:text-sm whitespace-nowrap">
            Mon - Sat: 8:30 AM - 7:00 PM
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav 
        className={`sticky top-0 z-50 backdrop-blur-md border-b-4 border-blue-600 transition-all duration-300 ${
          scrolled ? 'bg-green-600 shadow-lg' : 'bg-green-600/95'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <Link href="/">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src="/logo.png" 
                  alt="Sapthashwa Logo" 
                  className="w-28 sm:w-24 lg:w-32 h-28 sm:h-24 lg:h-32 object-contain"
                />
                {/* <span className="font-serif text-lg sm:text-2xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  Sapthashwa
                </span> */}
              </motion.div>
            </Link>

            {/* Desktop Menu - Centered */}
            <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="relative text-base font-semibold transition-colors duration-200"
                    >
                      <span className={`relative z-10 px-4 py-2 block ${isActive ? 'text-white' : 'text-gray-900 hover:text-primary'}`}>
                        {item.name}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeBox"
                          className="absolute inset-0 bg-primary rounded-lg"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/appointment">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-primary hover:opacity-90">
                    Book Appointment
                  </Button>
                </motion.div>
              </Link>
              <Link href="/#enquiry">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline">
                    Enquiry
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 hover:bg-muted rounded-full transition"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="lg:hidden pb-4 border-t overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`block py-3 px-4 text-base font-semibold transition-all duration-200 relative ${
                        isActive 
                          ? 'text-white bg-primary border-l-4 border-primary' 
                          : 'text-gray-900 hover:text-primary hover:bg-gray-50'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeMobileBox"
                          className="absolute inset-0 bg-primary -z-10 rounded-r-lg"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div 
                className="flex flex-col space-y-2 mt-4 px-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/appointment">
                  <Button className="w-full">Book Appointment</Button>
                </Link>
                <Link href="/#enquiry">
                  <Button variant="outline" className="w-full">Enquiry</Button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
