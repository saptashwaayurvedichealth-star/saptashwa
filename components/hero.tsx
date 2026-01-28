'use client';

import { Leaf, Phone, MessageCircle, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, staggerItem } from '@/lib/animations';
import { AnimatedCounter } from '@/components/animated-counter';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-primary/10 to-primary/5 overflow-hidden pt-20">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: 'url(https://res.cloudinary.com/dshqxriwz/image/upload/v1769499794/heroimg_k9p6lk.webp)'
          }}
        />
      </div>
      
      {/* Subtle Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <motion.div 
          className="absolute top-20 right-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-12 lg:py-20">
          {/* Left Content */}
          <motion.div 
            className="flex-1 space-y-8 max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Premium Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-primary/20 rounded-full shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(var(--primary-rgb), 0.2)" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Premium Ayurvedic Wellness Platform</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="font-serif text-4xl lg:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">Ancient Wisdom,</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                Modern Healing
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg lg:text-xl text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Experience the perfect blend of traditional Ayurvedic practices and contemporary medical science. Your journey to holistic wellness starts here.
            </motion.p>

            {/* Features Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: CheckCircle2, text: "Expert Practitioners" },
                { icon: CheckCircle2, text: "100% Natural Products" },
                { icon: CheckCircle2, text: "Personalized Care" },
                { icon: CheckCircle2, text: "Online Consultation" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-base font-medium text-gray-700">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link href="/appointment" className="w-full sm:w-auto">
                <motion.button 
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group hover:opacity-90 transition-opacity"
                  whileHover={{ 
                    scale: 1.03,
                    y: -2,
                    boxShadow: "0 25px 50px -12px rgba(var(--primary-rgb), 0.5)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Book Appointment Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <motion.button 
                  className="w-full sm:w-auto px-8 py-4 border-2 border-primary text-primary bg-white rounded-2xl font-semibold hover:bg-primary/5 transition-colors"
                  whileHover={{ 
                    scale: 1.03,
                    y: -2
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Explore Services
                </motion.button>
              </Link>
            </motion.div>

            {/* Contact Section */}
            <motion.div 
              className="flex flex-wrap gap-6 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.a 
                href="tel:+919739991801" 
                className="flex items-center gap-3 group"
                whileHover={{ x: 3 }}
              >
                <div className="p-3 bg-white border border-gray-200 rounded-xl group-hover:border-primary group-hover:bg-primary/5 transition-all shadow-sm">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Call Us</p>
                  <span className="text-sm font-bold text-gray-800">+91 97399 91801</span>
                </div>
              </motion.a>
              <motion.a 
                href="https://wa.me/919739991801" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
                whileHover={{ x: 3 }}
              >
                <div className="p-3 bg-white border border-gray-200 rounded-xl group-hover:border-primary group-hover:bg-primary/5 transition-all shadow-sm">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">WhatsApp</p>
                  <span className="text-sm font-bold text-gray-800">Chat Now</span>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side - Modern Card Design */}
          <motion.div 
            className="flex-1 relative w-full max-w-2xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main Card - Holistic Wellness */}
              <motion.div 
                className="relative rounded-[2.5rem] shadow-2xl overflow-hidden p-1"
                initial={{ rotate: 2 }}
                animate={{ 
                  rotate: [2, 3, 2],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-gradient-to-br from-primary/5 to-primary/5 backdrop-blur-sm rounded-[2.4rem] p-12 h-[550px] flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute top-10 right-10 w-32 h-32 bg-primary/15 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-10 left-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                  />
                  
                  {/* Leaf Icon */}
                  <motion.div
                    className="mb-8"
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
                      <div className="relative text-8xl">🌿</div>
                    </div>
                  </motion.div>
                  
                  <h3 className="text-3xl lg:text-4xl font-serif font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent mb-4 text-center">
                    Holistic Wellness
                  </h3>
                  <p className="text-lg text-gray-600 text-center max-w-sm">
                    Traditional Ayurvedic treatments for modern lifestyle
                  </p>
                </div>
              </motion.div>

              {/* Top Rated Badge */}
              <motion.div 
                className="absolute -top-4 -right-4 z-10"
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  delay: 0.8,
                  duration: 0.5,
                  rotate: {
                    delay: 1,
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-full p-1 shadow-xl">
                  <div className="bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full px-5 py-5 text-center min-w-[120px]">
                    <div className="text-3xl mb-1">⭐</div>
                    <p className="text-xs font-bold text-gray-800 whitespace-nowrap">Top Rated</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Stats Card */}
              <motion.div 
                className="absolute -bottom-8 -left-8 z-10"
                initial={{ opacity: 0, y: 30, x: -30 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)"
                }}
              >
                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 min-w-[200px]">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="p-4 bg-emerald-100 rounded-2xl"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Leaf className="w-8 h-8 text-primary" />
                    </motion.div>
                    <div>
                      <p className="text-3xl font-bold text-gray-800">
                        <AnimatedCounter end={5000} duration={2.5} suffix="+" />
                      </p>
                      <p className="text-sm text-gray-600 font-medium">Happy Patients</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Floating Element */}
              <motion.div
                className="absolute top-1/4 -left-6 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl shadow-lg opacity-80"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-1/4 -right-6 w-12 h-12 bg-primary rounded-full shadow-lg opacity-70"
                animate={{ 
                  y: [0, 20, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
