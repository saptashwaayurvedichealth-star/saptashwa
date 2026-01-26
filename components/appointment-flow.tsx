'use client';

import { Check } from 'lucide-react';

export default function AppointmentFlow() {
  const steps = [
    {
      number: 1,
      title: 'Choose Practitioner',
      description: 'Select from our team of certified doctors and Ayurvedic specialists',
      completed: true
    },
    {
      number: 2,
      title: 'Select Time Slot',
      description: 'Pick from available time slots that fit your schedule',
      completed: false
    },
    {
      number: 3,
      title: 'Complete Payment',
      description: 'Secure payment with multiple options including insurance',
      completed: false
    },
    {
      number: 4,
      title: 'Join Consultation',
      description: 'Receive a link to join your video or in-person appointment',
      completed: false
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-light mb-4 text-pretty">
            Simple booking process
          </h2>
          <p className="text-muted-foreground text-lg">
            From consultation to care in just 4 easy steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Circle */}
              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-serif font-semibold text-lg mb-4 transition-all ${
                step.completed
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground border-2 border-border'
              }`}>
                {step.completed ? (
                  <Check className="w-6 h-6" />
                ) : (
                  step.number
                )}
              </div>

              {/* Card */}
              <div className={`rounded-2xl p-6 border ${
                step.completed
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-white border-border'
              }`}>
                <h3 className="font-serif font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 -right-6 w-12 h-0.5 bg-border"></div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-full font-medium hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300">
            Start Booking Now
          </button>
        </div>
      </div>
    </section>
  );
}
