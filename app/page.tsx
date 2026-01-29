'use client';

import Navigation from '@/components/navigation';
import Hero from '@/components/hero';
import Services from '@/components/services';
import { Treatments } from '@/components/treatments';
import ProductShowcase from '@/components/product-showcase';
import { Blogs } from '@/components/blogs';
import Testimonials from '@/components/testimonials';
import { About } from '@/components/about';
import { Enquiry } from '@/components/enquiry';
import Footer from '@/components/footer';
import WhatsAppFloat from '@/components/whatsapp-float';
import { motion } from 'framer-motion';
import { Award, Users, Star, Heart, TrendingUp, Shield } from 'lucide-react';
import { AnimatedCounter } from '@/components/animated-counter';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      
      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <motion.div 
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 bg-white/20 rounded-full mb-2 sm:mb-3 md:mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Users className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8" />
              </motion.div>
              <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                <AnimatedCounter end={5000} duration={2.5} suffix="+" />
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-white/90">Happy Patients</p>
            </motion.div>
            <motion.div 
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 bg-white/20 rounded-full mb-2 sm:mb-3 md:mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Award className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8" />
              </motion.div>
              <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                <AnimatedCounter end={10} duration={2.5} suffix="+" />
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-white/90">Years Experience</p>
            </motion.div>
            <motion.div 
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 bg-white/20 rounded-full mb-2 sm:mb-3 md:mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Star className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8" />
              </motion.div>
              <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                <AnimatedCounter end={4.9} decimals={1} duration={2.5} suffix="/5" />
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-white/90">Rating</p>
            </motion.div>
            <motion.div 
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 bg-white/20 rounded-full mb-2 sm:mb-3 md:mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Heart className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8" />
              </motion.div>
              <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                <AnimatedCounter end={100} duration={2.5} suffix="%" />
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-white/90">Natural Care</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Services />
      
      {/* Feature Highlight Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-14 sm:w-16 lg:w-20 h-14 sm:h-16 lg:h-20 bg-primary rounded-full mb-4 sm:mb-6"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Shield className="w-7 sm:w-8 lg:w-10 h-7 sm:h-8 lg:h-10 text-white" />
              </motion.div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Certified Practitioners</h3>
              <p className="text-sm sm:text-base text-gray-600">Our team consists of highly qualified and certified Ayurvedic practitioners with years of experience.</p>
            </motion.div>
            <motion.div
              className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-14 sm:w-16 lg:w-20 h-14 sm:h-16 lg:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 sm:mb-6"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <TrendingUp className="w-7 sm:w-8 lg:w-10 h-7 sm:h-8 lg:h-10 text-white" />
              </motion.div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Proven Results</h3>
              <p className="text-sm sm:text-base text-gray-600">Thousands of satisfied patients have experienced remarkable improvements in their health.</p>
            </motion.div>
            <motion.div
              className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-14 sm:w-16 lg:w-20 h-14 sm:h-16 lg:h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mb-4 sm:mb-6"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Heart className="w-7 sm:w-8 lg:w-10 h-7 sm:h-8 lg:h-10 text-white" />
              </motion.div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Personalized Care</h3>
              <p className="text-sm sm:text-base text-gray-600">Every treatment plan is customized to your unique constitution and health needs.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Treatments />
      <ProductShowcase />
      <Blogs />
      <Testimonials />
      <About />
      <Enquiry />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
