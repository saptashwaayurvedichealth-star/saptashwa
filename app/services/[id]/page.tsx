'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { ArrowLeft, Check, Leaf, Stethoscope, Zap, Droplet, Brain, Flower2, Heart, Activity } from 'lucide-react';
import Link from 'next/link';

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  order: number;
  isActive: boolean;
}

const iconMap: any = {
  'Leaf': Leaf,
  'Stethoscope': Stethoscope,
  'Zap': Zap,
  'Droplet': Droplet,
  'Brain': Brain,
  'Flower2': Flower2,
  'Heart': Heart,
  'Activity': Activity,
};

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);

  useEffect(() => {
    if (params.id) {
      fetchServiceDetail(params.id as string);
    }
  }, [params.id]);

  const fetchServiceDetail = async (id: string) => {
    try {
      const res = await fetch(`/api/services/${id}`);
      const data = await res.json();
      
      if (data.service) {
        setService(data.service);
        fetchRelatedServices(data.service._id);
      } else {
        router.push('/services');
      }
    } catch (error) {
      console.error('Error fetching service:', error);
      router.push('/services');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedServices = async (currentId: string) => {
    try {
      const res = await fetch('/api/services?isActive=true');
      const data = await res.json();
      const filtered = (data.services || []).filter((s: Service) => s._id !== currentId).slice(0, 3);
      setRelatedServices(filtered);
    } catch (error) {
      console.error('Error fetching related services:', error);
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

  if (!service) {
    return null;
  }

  const Icon = iconMap[service.icon] || Heart;

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/services"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Icon className="w-8 h-8" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
                {service.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {service.description}
              </p>
              <Link
                href="/appointment"
                className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Book Appointment
              </Link>
            </div>

            {service.image && (
              <div className="lg:col-span-3 relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      {service.features && service.features.length > 0 && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-8">
                What We Offer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-12 text-center">
            Why Choose This Service
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Personalized Care</h3>
              <p className="text-muted-foreground">
                Tailored treatment plans designed specifically for your unique health needs
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Expert Practitioners</h3>
              <p className="text-muted-foreground">
                Experienced professionals committed to your wellness journey
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Holistic Approach</h3>
              <p className="text-muted-foreground">
                Combining traditional Ayurvedic wisdom with modern healthcare practices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-12 text-center">
              Other Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService) => {
                const RelatedIcon = iconMap[relatedService.icon] || Heart;
                return (
                  <Link
                    key={relatedService._id}
                    href={`/services/${relatedService._id}`}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                  >
                    {relatedService.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={relatedService.image}
                          alt={relatedService.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <RelatedIcon className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {relatedService.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {relatedService.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-6">
            Ready to Begin Your Wellness Journey?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8">
            Book an appointment today and take the first step towards better health
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
