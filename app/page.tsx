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

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <Services />
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
