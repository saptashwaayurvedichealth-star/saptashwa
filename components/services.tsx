'use client';

import { Leaf, Stethoscope, Zap, Droplet, Brain, Flower2 } from 'lucide-react';

const services = [
  {
    icon: Leaf,
    title: 'Ayurvedic Consultation',
    description: 'Personalized Ayurvedic diagnosis and treatment plans',
    color: 'bg-green-50 text-green-600'
  },
  {
    icon: Stethoscope,
    title: 'Modern Medicine',
    description: 'Evidence-based medical consultations & diagnostics',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: Droplet,
    title: 'Panchakarma Therapy',
    description: 'Traditional detoxification and rejuvenation treatments',
    color: 'bg-cyan-50 text-cyan-600'
  },
  {
    icon: Brain,
    title: 'Stress Management',
    description: 'Wellness programs combining yoga and meditation',
    color: 'bg-purple-50 text-purple-600'
  },
  {
    icon: Zap,
    title: 'Nutrition Counseling',
    description: 'Customized dietary plans for optimal health',
    color: 'bg-amber-50 text-amber-600'
  },
  {
    icon: Flower2,
    title: 'Wellness Spa',
    description: 'Luxury treatments with natural ingredients',
    color: 'bg-rose-50 text-rose-600'
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary mb-2 inline-block">Our Specialties</span>
          <h2 className="font-serif text-4xl lg:text-5xl font-light mb-4 text-pretty">
            Comprehensive wellness solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            From traditional Ayurveda to modern medicine, we offer integrated care for complete wellness
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
