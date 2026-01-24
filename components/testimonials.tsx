'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Patel',
    role: 'Corporate Executive',
    text: 'Vaidya transformed my health. After 6 months of combined Ayurvedic and medical guidance, I feel completely revitalized. The telemedicine platform made it so convenient.',
    rating: 5,
    avatar: '👩‍💼'
  },
  {
    name: 'Arjun Singh',
    role: 'Entrepreneur',
    text: 'Finally found a wellness center that combines ancient wisdom with modern science. The practitioners are incredibly knowledgeable and the products are authentic.',
    rating: 5,
    avatar: '👨‍💼'
  },
  {
    name: 'Deepika Verma',
    role: 'Wellness Coach',
    text: 'As a wellness professional, I was impressed by their holistic approach. The integrated treatment plan worked wonders for my chronic stress and sleep issues.',
    rating: 5,
    avatar: '👩‍🏫'
  },
  {
    name: 'Rahul Menon',
    role: 'Tech Professional',
    text: 'The mobile app is seamless and the video consultations are top-notch. No more travel time, same world-class care. Highly recommended!',
    rating: 5,
    avatar: '👨‍💻'
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary mb-2 inline-block">Testimonials</span>
          <h2 className="font-serif text-4xl lg:text-5xl font-light mb-4 text-pretty">
            Trusted by thousands
          </h2>
          <p className="text-muted-foreground text-lg">
            Real stories from our patients and wellness community
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-border p-8 hover:shadow-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
          {[
            { value: '5000+', label: 'Patients Treated' },
            { value: '50+', label: 'Expert Practitioners' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '15+', label: 'Years Experience' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-serif text-3xl lg:text-4xl font-semibold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
