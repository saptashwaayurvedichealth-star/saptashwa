'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import WhatsAppFloat from '@/components/whatsapp-float';
import { motion } from 'framer-motion';
import { 
  Leaf, Heart, Award, Users, Target, Eye, Lightbulb, 
  Shield, Star, TrendingUp, Clock, MapPin, Phone, Mail,
  CheckCircle, Sparkles, ActivitySquare
} from 'lucide-react';
import Link from 'next/link';
import { AnimatedCounter } from '@/components/animated-counter';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Chief Ayurvedic Physician",
      experience: "15+ Years",
      image: "👨‍⚕️"
    },
    {
      name: "Dr. Priya Sharma",
      role: "Senior Ayurvedic Consultant",
      experience: "12+ Years",
      image: "👩‍⚕️"
    },
    {
      name: "Dr. Amit Patel",
      role: "Panchakarma Specialist",
      experience: "10+ Years",
      image: "👨‍⚕️"
    },
    {
      name: "Dr. Anjali Reddy",
      role: "Wellness Coach",
      experience: "8+ Years",
      image: "👩‍⚕️"
    }
  ];

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
    { year: "2010", event: "Founded Saptashwa Ayurvedic Health Center" },
    { year: "2014", event: "Expanded to 3 treatment centers" },
    { year: "2017", event: "Launched online consultation services" },
    { year: "2020", event: "Treated 5000+ patients successfully" },
    { year: "2024", event: "Recognized as Top Ayurvedic Center" }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">About Saptashwa</span>
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">Your Journey to Holistic Wellness</span>
            </h1>
            
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Empowering lives through authentic Ayurvedic wisdom and compassionate care since 2010
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div 
                className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <Users className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-gray-800">
                  <AnimatedCounter end={5000} duration={2.5} suffix="+ Patients" />
                </span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <Award className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-gray-800">
                  <AnimatedCounter end={15} duration={2.5} suffix="+ Years" />
                </span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-800">
                  <AnimatedCounter end={4.9} decimals={1} duration={2.5} suffix="/5 Rating" />
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  Founded in 2010, Saptashwa Ayurvedic Health Center was born from a vision to make authentic 
                  Ayurvedic healthcare accessible to everyone. Our founder, Dr. Rajesh Kumar, with over 15 years 
                  of experience in traditional Ayurveda, recognized the need for a holistic healthcare approach 
                  that treats the root cause, not just symptoms.
                </p>
                <p>
                  What started as a small clinic has grown into a trusted name in Ayurvedic wellness, serving 
                  thousands of patients who have found relief from chronic ailments and improved their overall 
                  quality of life. Our success lies in our commitment to authentic treatments, natural remedies, 
                  and personalized care plans.
                </p>
                <p>
                  Today, we continue our mission to bridge ancient Ayurvedic wisdom with modern healthcare needs, 
                  helping people achieve optimal health through natural, sustainable methods.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[500px] bg-gradient-to-br from-emerald-100 via-teal-100 to-amber-100 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-9xl"
                  >
                    🌿
                  </motion.div>
                </div>
              </div>
              
              {/* Floating Stats */}
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <p className="text-4xl font-bold text-emerald-600">
                    <AnimatedCounter end={100} duration={2.5} suffix="%" />
                  </p>
                  <p className="text-sm text-gray-600">Natural Products</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
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
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">Our Mission</h3>
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
                <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">Our Vision</h3>
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
            <h2 className="text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-gradient-to-b from-emerald-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-6"
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
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-4">Our Journey</h2>
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
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Year Badge */}
                  <motion.div 
                    className="relative z-10 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-2xl font-bold text-white">{milestone.year.slice(-2)}</span>
                  </motion.div>
                  
                  {/* Full Year */}
                  <p className="relative z-10 text-3xl font-bold text-emerald-600 mb-3">{milestone.year}</p>
                  
                  {/* Event Description */}
                  <p className="relative z-10 text-gray-700 font-medium leading-relaxed">{milestone.event}</p>
                  
                  {/* Decorative Element */}
                  <motion.div 
                    className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Number Badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-emerald-600">{index + 1}</span>
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
                    <div className="text-emerald-500 text-2xl">→</div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Expert practitioners dedicated to your wellness</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="relative mb-6"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center text-7xl shadow-xl group-hover:shadow-2xl transition-shadow">
                    {member.image}
                  </div>
                  <motion.div 
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-full text-sm font-semibold shadow-lg whitespace-nowrap"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {member.experience}
                  </motion.div>
                </motion.div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-emerald-600 font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-4">Why Choose Saptashwa?</h2>
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
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
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
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 relative overflow-hidden">
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
                  className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition-shadow"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Appointment
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-emerald-600 transition-colors"
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
