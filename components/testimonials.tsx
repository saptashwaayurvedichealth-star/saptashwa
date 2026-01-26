'use client';

import { useState, useEffect } from 'react';
import { Star, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  _id: string
  patientName: string
  description: string
  rating: number
  image?: string
  youtubeUrl?: string
  treatment: string
  isFeatured: boolean
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials?isActive=true')
      const data = await response.json()
      setTestimonials(data.testimonials || [])
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-muted/40">
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

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial._id}
                className="hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-8">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* YouTube Video if available */}
                  {testimonial.youtubeUrl && (
                    <div className="mb-4 relative bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                      <a 
                        href={testimonial.youtubeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition"
                      >
                        <Play className="w-12 h-12" />
                        <span className="text-sm font-medium">Watch Video Testimonial</span>
                      </a>
                    </div>
                  )}

                  {/* Text */}
                  <p className="text-foreground leading-relaxed mb-6">
                    "{testimonial.description}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    {testimonial.image ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.patientName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                        😊
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.patientName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.treatment}
                      </p>
                    </div>
                  </div>
                </CardContent>
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
  );
}
