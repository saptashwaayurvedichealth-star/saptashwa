'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Testimonial {
  _id: string;
  patientName: string;
  treatment: string;
  rating: number;
  description: string;
  image?: string;
  youtubeUrl?: string;
  createdAt: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="py-20 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
              Patient Testimonials
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real stories from real people who have experienced our care
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <div className="space-y-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial._id} className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Left Side - YouTube Video */}
                    {testimonial.youtubeUrl ? (
                      <div className="relative bg-black aspect-video lg:aspect-auto lg:min-h-[400px]">
                        <iframe
                          src={getYouTubeEmbedUrl(testimonial.youtubeUrl) || ''}
                          title={`${testimonial.patientName} Testimonial`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        ></iframe>
                      </div>
                    ) : (
                      <div className="relative bg-gradient-to-br from-emerald-100 to-teal-100 aspect-video lg:aspect-auto lg:min-h-[400px] flex items-center justify-center">
                        {testimonial.image ? (
                          <img
                            src={testimonial.image}
                            alt={testimonial.patientName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-full bg-white/80 flex items-center justify-center">
                            <span className="text-5xl font-serif text-emerald-600">
                              {testimonial.patientName.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Right Side - Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
                      <div className="mb-6">
                        <h2 className="text-3xl font-serif text-gray-900 mb-2">
                          {testimonial.patientName}
                        </h2>
                        <p className="text-emerald-600 font-medium mb-4">
                          Treated for {testimonial.treatment}. Complete reversal of condition..
                        </p>
                        <div className="mb-4">{renderStars(testimonial.rating)}</div>
                      </div>

                      <blockquote className="text-gray-700 text-lg leading-relaxed italic border-l-4 border-emerald-500 pl-6 mb-6">
                        "{testimonial.description}"
                      </blockquote>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>
                          {new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {!loading && testimonials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No testimonials available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
