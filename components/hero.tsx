'use client';

import { Leaf, Phone, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 py-20 lg:py-28">
          {/* Left Content */}
          <div className="flex-1 space-y-8 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">Premium Ayurvedic Wellness Platform</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Ancient Wisdom, Modern Healing
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Experience the perfect blend of traditional Ayurvedic practices and contemporary medical science. 
              Your journey to holistic wellness starts here.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">Expert Practitioners</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">100% Natural Products</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">Personalized Care</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">Online Consultation</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/appointment">
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1">
                  Book Appointment Now
                </button>
              </Link>
              <Link href="/services">
                <button className="w-full sm:w-auto px-8 py-4 border-2 border-emerald-600 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300">
                  Explore Services
                </button>
              </Link>
            </div>

            {/* Quick Contact */}
            <div className="flex flex-wrap gap-6 pt-8 border-t border-gray-200">
              <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition group">
                <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Call Us</p>
                  <span className="text-sm font-semibold">+91 97399 91801</span>
                </div>
              </a>
              <a href="https://wa.me/1234567890" className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition group">
                <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">WhatsApp</p>
                  <span className="text-sm font-semibold">Chat Now</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="flex-1 relative w-full">
            <div className="relative h-[500px] lg:h-[600px]">
              {/* Main Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-400 to-amber-400 rounded-3xl shadow-2xl transform rotate-3 animate-pulse"></div>
              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Hero Image Placeholder */}
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
                  <div className="text-8xl mb-6 animate-bounce">🌿</div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Holistic Wellness</h3>
                  <p className="text-gray-600 text-center max-w-xs">
                    Traditional Ayurvedic treatments for modern lifestyle
                  </p>
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <Leaf className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-800">5000+</p>
                    <p className="text-sm text-gray-500">Happy Patients</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full p-4 shadow-xl animate-pulse">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">⭐</p>
                  <p className="text-xs font-semibold text-white">Top Rated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
