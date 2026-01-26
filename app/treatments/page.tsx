'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Card } from '@/components/ui/card';

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
      
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
              Our Treatments
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive wellness treatments combining traditional wisdom with modern science
            </p>
          </div>

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
                        <div>
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

      <Footer />
    </main>
  );
}
