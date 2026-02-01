'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

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
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

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
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.span 
            className="text-sm font-medium bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent mb-2 inline-block"
            variants={staggerItem}
          >
            Testimonials
          </motion.span>
          <motion.h2 
            className="font-serif text-4xl lg:text-5xl font-light mb-4 text-pretty bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent"
            variants={staggerItem}
          >
            Trusted by thousands
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            variants={staggerItem}
          >
            Real stories from our patients and wellness community
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <motion.div 
              className="inline-block rounded-full h-12 w-12 border-b-2 border-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : testimonials.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground">No testimonials available at the moment.</p>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6 sm:gap-8">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial._id}
                    className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-16px)] min-w-0"
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                      <CardContent className="p-6 sm:p-8">
                        {/* Stars */}
                        <motion.div 
                          className="flex gap-1 mb-4"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={staggerContainer}
                        >
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              variants={{
                                hidden: { opacity: 0, scale: 0 },
                                visible: { 
                                  opacity: 1, 
                                  scale: 1,
                                  transition: { delay: i * 0.1 }
                                }
                              }}
                              whileHover={{ 
                                scale: 1.2,
                                rotate: 360,
                                transition: { duration: 0.3 }
                              }}
                            >
                              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* YouTube Video if available */}
                        {testimonial.youtubeUrl && (
                          <motion.div 
                            className="mb-4 relative bg-gray-100 rounded-lg overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="relative pt-[56.25%]">
                              <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${testimonial.youtubeUrl.includes('youtu.be') 
                                  ? testimonial.youtubeUrl.split('youtu.be/')[1]?.split('?')[0] 
                                  : testimonial.youtubeUrl.split('v=')[1]?.split('&')[0]}?autoplay=1&mute=1&loop=1&controls=1&modestbranding=1&playsinline=1&rel=0`}
                                title={`Video testimonial by ${testimonial.patientName}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          </motion.div>
                        )}

                        {/* Text */}
                        <motion.p 
                          className="text-foreground leading-relaxed mb-6"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          "{testimonial.description}"
                        </motion.p>

                        {/* Author */}
                        <motion.div 
                          className="flex items-center gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                        >
                          {testimonial.image ? (
                            <motion.div 
                              className="w-12 h-12 rounded-full overflow-hidden"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.patientName}
                                className="w-full h-full object-cover"
                              />
                            </motion.div>
                          ) : (
                            <motion.div 
                              className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl"
                              whileHover={{ scale: 1.1, rotate: 10 }}
                              transition={{ duration: 0.2 }}
                            >
                              😊
                            </motion.div>
                          )}
                          <div>
                            <p className="font-semibold text-foreground">
                              {testimonial.patientName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.treatment}
                            </p>
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={scrollPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
