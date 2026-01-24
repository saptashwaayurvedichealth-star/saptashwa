'use client';

import { Star, Calendar } from 'lucide-react';

const doctors = [
  {
    name: 'Dr. Ananya Sharma',
    specialization: 'Ayurvedic Medicine & Panchakarma',
    experience: '18 years',
    qualifications: 'BAMS, MD Ayurveda',
    rating: 4.9,
    reviews: 342,
    image: '👩‍⚕️'
  },
  {
    name: 'Dr. Rajesh Kumar',
    specialization: 'Internal Medicine & Wellness',
    experience: '22 years',
    qualifications: 'MBBS, MD Internal Medicine',
    rating: 4.8,
    reviews: 418,
    image: '👨‍⚕️'
  },
  {
    name: 'Dr. Priya Menon',
    specialization: 'Nutritional Medicine',
    experience: '12 years',
    qualifications: 'BHMS, MS Nutrition',
    rating: 4.9,
    reviews: 256,
    image: '👩‍⚕️'
  },
  {
    name: 'Dr. Vikram Singh',
    specialization: 'Sports Medicine & Rehabilitation',
    experience: '16 years',
    qualifications: 'MBBS, DM Sports Medicine',
    rating: 4.7,
    reviews: 198,
    image: '👨‍⚕️'
  },
];

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

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image Section */}
              <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-7xl">{doctor.image}</span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                  {doctor.name}
                </h3>
                <p className="text-primary text-xs font-medium mb-3">
                  {doctor.specialization}
                </p>

                <div className="space-y-2 mb-4 pb-4 border-b border-border text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">{doctor.experience}</span> experience
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {doctor.qualifications}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-foreground">{doctor.rating}</span>
                    <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Consult Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
