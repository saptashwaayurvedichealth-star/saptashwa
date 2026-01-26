'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { ArrowLeft, Check, Clock, DollarSign, Heart, Activity, Leaf, Star } from 'lucide-react';
import Link from 'next/link';

interface Treatment {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  price: number;
  duration: string;
  category: string;
  benefits?: string[];
  isActive: boolean;
}

export default function TreatmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedTreatments, setRelatedTreatments] = useState<Treatment[]>([]);

  useEffect(() => {
    if (params.id) {
      fetchTreatmentDetail(params.id as string);
    }
  }, [params.id]);

  const fetchTreatmentDetail = async (id: string) => {
    try {
      const res = await fetch(`/api/treatments/${id}`);
      const data = await res.json();
      
      if (data.treatment) {
        setTreatment(data.treatment);
        fetchRelatedTreatments(data.treatment._id, data.treatment.category);
      } else {
        router.push('/treatments');
      }
    } catch (error) {
      console.error('Error fetching treatment:', error);
      router.push('/treatments');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedTreatments = async (currentId: string, category: string) => {
    try {
      const res = await fetch('/api/treatments');
      const data = await res.json();
      const filtered = (data.treatments || [])
        .filter((t: Treatment) => t._id !== currentId && t.isActive !== false)
        .slice(0, 3);
      setRelatedTreatments(filtered);
    } catch (error) {
      console.error('Error fetching related treatments:', error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!treatment) {
    return null;
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/treatments"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Treatments
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                {treatment.category}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
                {treatment.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {treatment.shortDescription}
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 border border-gray-200">
                  <Clock className="text-primary" size={20} />
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-semibold">{treatment.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 border border-gray-200">
                  <DollarSign className="text-primary" size={20} />
                  <div>
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="font-semibold">₹{treatment.price}</p>
                  </div>
                </div>
              </div>

              <Link
                href="/appointment"
                className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Book This Treatment
              </Link>
            </div>

            {treatment.image && (
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={treatment.image}
                  alt={treatment.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6">
              About This Treatment
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
              {treatment.description}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {treatment.benefits && treatment.benefits.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-8">
                Treatment Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {treatment.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-white border border-primary/10">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose This Treatment */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-12 text-center">
            Why Choose This Treatment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Expert Care</h3>
              <p className="text-muted-foreground">
                Administered by experienced Ayurvedic practitioners with years of expertise
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Natural Healing</h3>
              <p className="text-muted-foreground">
                Using authentic Ayurvedic herbs and natural ingredients for safe, effective treatment
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Personalized Approach</h3>
              <p className="text-muted-foreground">
                Customized treatment plans tailored to your specific health needs and constitution
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Treatments */}
      {relatedTreatments.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-12 text-center">
              Other Treatments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedTreatments.map((relatedTreatment) => (
                <Link
                  key={relatedTreatment._id}
                  href={`/treatments/${relatedTreatment._id}`}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                >
                  {relatedTreatment.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={relatedTreatment.image}
                        alt={relatedTreatment.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                      {relatedTreatment.category}
                    </span>
                    <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {relatedTreatment.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {relatedTreatment.shortDescription}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock size={14} />
                        {relatedTreatment.duration}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-primary">
                        <DollarSign size={14} />
                        ₹{relatedTreatment.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-6">
            Ready to Experience Natural Healing?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8">
            Book your treatment today and start your journey to better health and wellness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appointment"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Book Appointment
            </Link>
            <Link
              href="/about"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
