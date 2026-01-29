'use client'

import { Award, Users, Heart, TrendingUp, Leaf, Sparkles, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/animated-counter'

export function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-b from-white to-primary/5 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual Content */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Main Card */}
              <motion.div 
                className="bg-gradient-to-br from-primary/10 via-primary/8 to-amber-100 rounded-3xl h-[500px] flex items-center justify-center shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center p-8 relative z-10">
                  <motion.div 
                    className="text-9xl mb-6"
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
                    🧘‍♀️
                  </motion.div>
                  <h3 className="text-3xl font-serif font-bold text-gray-800 mb-3">Ayurvedic Excellence</h3>
                  <p className="text-gray-700 text-lg max-w-xs mx-auto">Traditional wisdom meets modern healthcare</p>
                </div>
                
                {/* Floating Leaves Animation */}
                <motion.div
                  className="absolute top-10 left-10"
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Leaf className="w-12 h-12 text-emerald-500/40" />
                </motion.div>
                <motion.div
                  className="absolute bottom-20 right-10"
                  animate={{ 
                    y: [0, 15, 0],
                    rotate: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <Sparkles className="w-12 h-12 text-amber-500/40" />
                </motion.div>
              </motion.div>
              
              {/* Stats Cards */}
              <motion.div 
                className="grid grid-cols-2 gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.div 
                  className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-3 bg-emerald-100 rounded-xl mb-3 w-fit mx-auto">
                    <Users className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">
                    <AnimatedCounter end={5000} duration={2.5} suffix="+" />
                  </p>
                  <p className="text-sm text-gray-600">Happy Patients</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-3 bg-teal-100 rounded-xl mb-3 w-fit mx-auto">
                    <Award className="w-8 h-8 text-teal-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">
                    <AnimatedCounter end={10} duration={2.5} suffix="+" />
                  </p>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </motion.div>

                <motion.div 
                  className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-3 bg-amber-100 rounded-xl mb-3 w-fit mx-auto">
                    <Sparkles className="w-8 h-8 text-amber-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">
                    <AnimatedCounter end={4.5} decimals={1} duration={2.5} suffix="/5" />
                  </p>
                  <p className="text-sm text-gray-600">Rating</p>
                </motion.div>

                <motion.div 
                  className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-3 bg-green-100 rounded-xl mb-3 w-fit mx-auto">
                    <Leaf className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">
                    <AnimatedCounter end={100} duration={2.5} suffix="%" />
                  </p>
                  <p className="text-sm text-gray-600">Natural Care</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Heart className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">About Us</span>
              </motion.div>
              <motion.h2 
                className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Committed to Your <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Health & Wellness</span>
              </motion.h2>
            </div>

            <motion.p 
              className="text-gray-700 leading-relaxed text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              We are a leading Ayurvedic healthcare provider dedicated to delivering exceptional holistic medical services. 
              With over 10 years of experience, our team of expert practitioners and healthcare professionals 
              are committed to providing personalized care to each patient.
            </motion.p>

            <motion.p 
              className="text-gray-700 leading-relaxed text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Our state-of-the-art facility combines ancient Ayurvedic wisdom with modern medical technology, ensuring 
              accurate diagnoses and effective treatments. We believe in a patient-centric approach, 
              focusing on preventive care and long-term health management.
            </motion.p>
            
            {/* Feature List */}
            <motion.div 
              className="grid md:grid-cols-2 gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {[
                'Certified Ayurvedic Practitioners',
                '100% Natural Treatments',
                'Personalized Care Plans',
                'Modern Diagnostic Facilities'
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-gray-800 font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.button 
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More About Us
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
