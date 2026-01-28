'use client';

import { Video, Clock, Shield, Smartphone } from 'lucide-react';

export default function TelemedicineSection() {
  return (
    <section id="telemedicine" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Visual */}
          <div className="relative h-96 lg:h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/15 to-primary/10 rounded-3xl overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4">📱</div>
                <p className="text-muted-foreground">Telemedicine platform</p>
              </div>
            </div>

            {/* Feature Cards Floating */}
            <div className="absolute -bottom-6 -left-4 bg-white rounded-2xl shadow-xl p-4 max-w-xs border border-border">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold text-sm text-foreground">24/7 Access</p>
                  <p className="text-xs text-muted-foreground">Consult anytime</p>
                </div>
              </div>
            </div>

            <div className="absolute top-12 -right-4 bg-white rounded-2xl shadow-xl p-4 max-w-xs border border-border">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-secondary" />
                <div>
                  <p className="font-semibold text-sm text-foreground">HIPAA Compliant</p>
                  <p className="text-xs text-muted-foreground">Secure & private</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div>
              <span className="text-sm font-medium text-primary mb-2 inline-block">SaaS Telemedicine Platform</span>
              <h2 className="font-serif text-4xl lg:text-5xl font-light mb-6 text-pretty">
                Healthcare at your fingertips
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Access world-class medical and Ayurvedic consultations from anywhere. Our secure platform connects you with expert practitioners in minutes.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {[
                {
                  icon: Video,
                  title: 'Video Consultations',
                  description: 'HD video calls with licensed practitioners'
                },
                {
                  icon: Clock,
                  title: 'Instant Booking',
                  description: 'Schedule appointments with available slots'
                },
                {
                  icon: Smartphone,
                  title: 'Mobile App',
                  description: 'Seamless experience on iOS and Android'
                },
                {
                  icon: Shield,
                  title: 'Data Security',
                  description: 'Enterprise-grade encryption & privacy'
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                Download App
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
