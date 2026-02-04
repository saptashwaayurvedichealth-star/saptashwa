'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import WhatsAppFloat from '@/components/whatsapp-float';
import PageHeader from '@/components/page-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Treatment {
  _id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  image?: string;
  benefits: string[];
}

export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      const res = await fetch('/api/treatments');
      const data = await res.json();
      setTreatments(data.treatments || []);
    } catch (error) {
      console.error('Error fetching treatments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageHeader 
        title="Our Treatments"
        subtitle="Comprehensive wellness treatments combining traditional wisdom with modern science"
        badge="Holistic Healing"
      />
      
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading treatments...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {treatments.map((treatment) => (
                <Link key={treatment._id} href={`/treatments/${treatment._id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full cursor-pointer group">
                    {treatment.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={treatment.image}
                          alt={treatment.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">{treatment.name}</h3>
                      <p className="text-muted-foreground mb-4">{treatment.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm">
                          <span className="font-semibold">Duration:</span> {treatment.duration}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Price:</span> ₹{treatment.price}
                        </p>
                      </div>

                      {treatment.benefits && treatment.benefits.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Benefits:</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {treatment.benefits.slice(0, 3).map((benefit, idx) => (
                              <li key={idx}>{benefit}</li>
                            ))}
                          </ul>
                          {treatment.benefits.length > 3 && (
                            <p className="text-xs text-primary mt-2">+ {treatment.benefits.length - 3} more benefits</p>
                          )}
                        </div>
                      )}
                      
                      <Button className="w-full bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white border-0 mt-auto">
                        Explore
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {!loading && treatments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No treatments available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <WhatsAppFloat />
      <Footer />
    </main>
  );
}
