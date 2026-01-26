'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { About } from '@/components/about';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <About />
      <Footer />
    </main>
  );
}
