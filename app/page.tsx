'use client';

import { useState } from 'react';
import Navigation from '@/components/navigation';
import Hero from '@/components/hero';
import Services from '@/components/services';
import DoctorProfiles from '@/components/doctor-profiles';
import TelemedicineSection from '@/components/telemedicine';
import ProductShowcase from '@/components/product-showcase';
import Testimonials from '@/components/testimonials';
import AppointmentFlow from '@/components/appointment-flow';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <Services />
      <DoctorProfiles />
      <TelemedicineSection />
      <ProductShowcase />
      <AppointmentFlow />
      <Testimonials />
      <Footer />
    </div>
  );
}
