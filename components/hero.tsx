'use client';

import { Leaf, Phone, MessageCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-20 lg:py-32">
          {/* Left Content */}
          <div className="flex-1 space-y-6 max-w-2xl">
            <div className="flex items-center gap-3">
              <Leaf className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-secondary">Premium Wellness Platform</span>
            </div>

            <h1 className="font-serif text-5xl lg:text-6xl font-light leading-tight text-pretty">
              Ayurveda meets{' '}
              <span className="text-primary font-semibold">modern medicine</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Experience luxury wellness combining ancient Ayurvedic wisdom with contemporary medical expertise. 
              Book consultations, access telemedicine, and discover premium wellness products.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition hover:shadow-lg hover:shadow-primary/20">
                Book Appointment
              </button>
              <button className="px-8 py-3 border border-primary text-primary rounded-full font-medium hover:bg-primary/5 transition">
                Explore Services
              </button>
            </div>

            {/* Quick Contact */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
              <a href="tel:+1234567890" className="flex items-center gap-3 text-foreground hover:text-primary transition">
                <Phone className="w-5 h-5" />
                <span className="text-sm">+1 (234) 567-890</span>
              </a>
              <a href="https://wa.me/1234567890" className="flex items-center gap-3 text-foreground hover:text-secondary transition">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="flex-1 relative h-96 lg:h-[500px] w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-3xl overflow-hidden">
              {/* Placeholder for premium image */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌿</div>
                  <p className="text-muted-foreground">Premium wellness imagery</p>
                </div>
              </div>
            </div>
            
            {/* Trust Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-sm border border-border rounded-2xl p-4">
              <p className="text-xs text-muted-foreground mb-2">Trusted by</p>
              <div className="flex gap-3 items-center">
                <span className="font-semibold text-lg">5000+</span>
                <span className="text-sm text-muted-foreground">Patients Treated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
