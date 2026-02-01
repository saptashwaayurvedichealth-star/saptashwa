'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import WhatsAppFloat from '@/components/whatsapp-float';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Service {
  _id: string;
  name: string;
  description: string;
  icon?: string;
  image?: string;
  features: string[];
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">Our Services</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive healthcare services designed for your wellbeing
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading services...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Link key={service._id} href={`/services/${service._id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full cursor-pointer group">
                    {service.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">{service.name}</h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>

                      {service.features && service.features.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Features:</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {service.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                          {service.features.length > 3 && (
                            <p className="text-xs text-primary mt-2">+ {service.features.length - 3} more features</p>
                          )}
                        </div>
                      )}
                      
                      <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white border-0 mt-auto">
                        Explore
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {!loading && services.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No services available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <WhatsAppFloat />
      <Footer />
    </main>
  );
}
