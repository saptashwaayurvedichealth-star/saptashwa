'use client';

import { Star, Calendar } from 'lucide-react';

export default function DoctorProfiles() {
  return (
    <section id="doctors" className="py-20 lg:py-32 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary mb-2 inline-block">Expert Team</span>
          <h2 className="font-serif text-4xl lg:text-5xl font-light mb-4 text-pretty">
            Meet our world-class practitioners
          </h2>
          <p className="text-muted-foreground text-lg">
            Certified experts with years of experience in Ayurveda and modern medicine
          </p>
        </div>

        {/* Doctors Grid - No data yet */}
        <div className="text-center py-12">
          <p className="text-muted-foreground">Doctor profiles coming soon...</p>
        </div>
      </div>
    </section>
  );
}
