'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import WhatsAppFloat from '@/components/whatsapp-float';
import PageHeader from '@/components/page-header';
import { motion } from 'framer-motion';
import { 
  Leaf, Heart, Award, Users, Target, Eye, Lightbulb, 
  Shield, Star, TrendingUp, Clock, MapPin, Phone, Mail,
  CheckCircle, Sparkles, ActivitySquare
} from 'lucide-react';
import Link from 'next/link';
import { AnimatedCounter } from '@/components/animated-counter';
import Image from 'next/image';

export default function AboutPage() {

  const values = [
    {
      icon: Heart,
      title: "Patient-Centric Care",
      description: "Every patient is unique. We provide personalized treatment plans tailored to individual needs."
    },
    {
      icon: Shield,
      title: "Quality & Safety",
      description: "We maintain the highest standards of quality and safety in all our treatments and products."
    },
    {
      icon: Leaf,
      title: "Natural Healing",
      description: "We believe in the power of nature and use 100% natural, authentic Ayurvedic remedies."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Combining ancient wisdom with modern research to provide effective healthcare solutions."
    }
  ];

  const milestones = [
    { year: "2016", event: "Founded Saptashwa Ayurvedic Health Center in Rajarajeshwari Nagar, Bengaluru" },
    { year: "2018", event: "Established Specialized Panchakarma Therapy Department" },
    { year: "2020", event: "Achieved milestone of 3000+ successful patient treatments" },
    { year: "2023", event: "Crossed 5000+ patients treated with holistic Ayurvedic care" },
    { year: "2026", event: "Recognized as Leading Ayurvedic Health Center with 13+ years expertise" }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <PageHeader 
        title="Your Journey to Holistic Wellness"
        subtitle="Empowering lives through authentic Ayurvedic wisdom and compassionate care since 2010"
        badge="About Saptashwa"
      />
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold text-gray-800">
                  <AnimatedCounter end={5000} duration={2.5} suffix="+" />
                </span>
              </div>
              <p className="text-sm text-gray-600">Happy Patients</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold text-gray-800">
                  <AnimatedCounter end={10} duration={2.5} suffix="+" />
                </span>
              </div>
              <p className="text-sm text-gray-600">Years Experience</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold text-gray-800">
                  <AnimatedCounter end={100} duration={2.5} suffix="%" />
                </span>
              </div>
              <p className="text-sm text-gray-600">Natural Care</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold text-gray-800">
                  <AnimatedCounter end={4.9} decimals={1} duration={2.5} suffix="/5" />
                </span>
              </div>
              <p className="text-sm text-gray-600">Rating</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold heading-gradient mb-3 sm:mb-4">Meet Our Founder</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">Pioneering holistic wellness with ancient wisdom</p>
          </motion.div>

          {/* Founder Card */}
          <motion.div
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Image Section */}
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] bg-gradient-to-br from-primary/10 to-amber-50">
              <Image 
                src="https://res.cloudinary.com/dshqxriwz/image/upload/v1769323171/samples/imagecon-group.jpg"
                alt="Dr. Sudha - Founder & Managing Director"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content Section */}
            <div className="p-5 sm:p-6 md:p-8 lg:p-12">
              {/* Header with Name and Social Links */}
              <motion.div 
                className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">Dr. Sudha</h3>
                    <p className="text-lg sm:text-xl text-primary font-semibold mb-1">Managing Director</p>
                    <p className="text-base sm:text-lg text-gray-600">Saptashwa Ayurvedic Health Center, Bengaluru</p>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex gap-3">
                    <motion.a 
                      href="https://www.facebook.com/share/18GhJLy6KE/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors shadow-lg"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="https://www.instagram.com/dr.sudha5724?utm_source=qr&igsh=MWN0amozMGF1NXl0ZQ=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full text-white hover:from-purple-700 hover:to-pink-600 transition-colors shadow-lg"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
              {/* Intro */}
              <motion.div 
                className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-gradient-to-r from-primary/5 via-amber-50/50 to-primary/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 border-l-4 border-primary shadow-sm">
                  <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium">
                    A visionary leader in Ayurvedic healthcare, Dr. Sudha has been transforming lives through holistic healing since 2016. 
                    As the Managing Director of Saptashwa Ayurvedic Health Center in Rajarajeshwari Nagar, Bengaluru, she brings over 
                    <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded-md mx-1"> 13 years of dedicated expertise</span> to guide more than 
                    <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded-md mx-1"> 5,000 patients</span> toward complete wellness.
                  </p>
                </div>
              </motion.div>

              {/* Expertise Cards */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <motion.div 
                  className="bg-gradient-to-br from-primary/10 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Specialized Education</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Postgraduate in <span className="font-semibold">Shalakya Tantra</span> — the specialized Ayurvedic branch treating 
                        eyes, ears, nose, throat, head, and neck disorders with precision and care.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-amber-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Panchakarma Mastery</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Expert in authentic <span className="font-semibold">Panchakarma therapies</span> — delivering comprehensive detoxification 
                        and rejuvenation treatments rooted in classical Ayurvedic principles.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Holistic Approach</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Specializes in managing <span className="font-semibold">chronic illnesses, musculoskeletal disorders, lifestyle diseases</span>, 
                        and ENT/ophthalmic conditions through personalized treatment protocols.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Root Cause Treatment</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Believes in <span className="font-semibold">treating the root cause</span> rather than suppressing symptoms, integrating 
                        diet, lifestyle modifications, herbal medicines, and detoxification.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Vision Statement */}
              <motion.div 
                className="bg-gradient-to-r from-primary/10 via-amber-50 to-primary/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Her Vision & Leadership</h4>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                      Under Dr. Sudha's compassionate leadership, Saptashwa Ayurvedic Health Center has blossomed into a sanctuary 
                      of natural healing. The center offers a complete spectrum of holistic services including Ayurvedic consultations, 
                      Panchakarma therapies, preventive healthcare, and wellness programs.
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      Her patient-centered approach, deep understanding of classical Ayurveda, and unwavering dedication have made her 
                      a beacon of hope and healing for thousands seeking authentic, effective, and compassionate healthcare.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold heading-gradient">Our Mission</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide accessible, authentic Ayurvedic healthcare that empowers individuals to achieve 
                optimal health and well-being through natural, time-tested treatments and personalized care. 
                We are committed to preserving traditional wisdom while embracing modern healthcare standards.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold heading-gradient">Our Vision</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the most trusted Ayurvedic wellness center, recognized for excellence in holistic 
                healthcare, where every individual finds their path to lasting health, vitality, and balance. 
                We envision a world where Ayurveda is the first choice for preventive and curative healthcare.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold heading-gradient mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-gradient-to-b from-primary/5 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl mb-6"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <value.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey / Timeline */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold heading-gradient mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Milestones that shaped our growth</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all h-full relative overflow-hidden group"
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Year Badge */}
                  <motion.div 
                    className="relative z-10 inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-2xl font-bold text-white">{milestone.year.slice(-2)}</span>
                  </motion.div>
                  
                  {/* Full Year */}
                  <p className="relative z-10 text-3xl font-bold text-primary mb-3">{milestone.year}</p>
                  
                  {/* Event Description */}
                  <p className="relative z-10 text-gray-700 font-medium leading-relaxed">{milestone.event}</p>
                  
                  {/* Decorative Element */}
                  <motion.div 
                    className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Number Badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                </motion.div>
                
                {/* Connecting Arrow (except for last item) */}
                {index < milestones.length - 1 && (
                  <motion.div 
                    className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    <div className="text-primary text-2xl">→</div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold heading-gradient mb-4">Why Choose Saptashwa?</h2>
            <p className="text-xl text-gray-600">What makes us different</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Certified Experts", desc: "All our practitioners are certified and have years of experience" },
              { icon: Leaf, title: "100% Natural", desc: "We use only authentic, natural Ayurvedic herbs and treatments" },
              { icon: Users, title: "5000+ Happy Patients", desc: "Thousands of satisfied patients trust us with their health" },
              { icon: Shield, title: "Safe & Effective", desc: "Proven treatments with no side effects" },
              { icon: TrendingUp, title: "Proven Results", desc: "High success rate in treating chronic conditions" },
              { icon: Heart, title: "Personalized Care", desc: "Every treatment plan is customized to your needs" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-teal-600 rounded-xl flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Book your consultation today and experience the healing power of Ayurveda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointment">
                <motion.button
                  className="px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition-shadow"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Appointment
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Services
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <WhatsAppFloat />
      <Footer />
    </main>
  );
}
