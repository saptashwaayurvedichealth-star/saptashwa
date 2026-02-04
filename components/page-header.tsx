'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary via-teal-600 to-teal-700 overflow-hidden">
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Diagonal Lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-white"
              style={{
                top: `${i * 10}%`,
                left: '-10%',
                right: '-10%',
                transform: 'rotate(-15deg)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          ))}
        </div>

        {/* Circular Ripples */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 border border-white/10 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-48 sm:w-72 h-48 sm:h-72 border border-white/10 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Floating Dots Pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-teal-800/30 via-transparent to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          {badge && (
            <motion.div
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-xl text-sm sm:text-base mb-8 sm:mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
              }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-5 h-5 text-white flex-shrink-0" />
              </motion.div>
              <span className="font-bold text-white tracking-wide">{badge}</span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-normal"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>

          {/* Decorative Divider */}
          <motion.div
            className="mt-12 sm:mt-14 flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.div 
              className="h-0.5 w-20 sm:w-28 bg-white/40 rounded-full"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="relative"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="w-3 h-3 rounded-full bg-white shadow-lg"></div>
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-white animate-ping opacity-75"></div>
            </motion.div>
            <motion.div 
              className="h-0.5 w-20 sm:w-28 bg-white/40 rounded-full"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
    </section>
  );
}
