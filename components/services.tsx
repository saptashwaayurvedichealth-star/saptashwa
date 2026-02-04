'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Leaf, Activity, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface Service {
  _id: string
  title: string
  description: string
  image: string
  features: string[]
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 640px)': { slidesToScroll: 1 },
        '(min-width: 1024px)': { slidesToScroll: 1 }
      }
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services?isActive=true')
      const data = await response.json()
      setServices(data.services || [])
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="services" className="py-12 sm:py-20 lg:py-32 bg-gradient-to-b from-white via-primary/10 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-56 sm:w-96 h-56 sm:h-96 bg-primary/8 rounded-full blur-3xl"></div>
      
      <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded-full mb-3 sm:mb-4"
            variants={staggerItem}
          >
            <Leaf className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold heading-gradient">Our Specialties</span>
          </motion.div>
          <motion.h2 
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 heading-gradient"
            variants={staggerItem}
          >
            Comprehensive Wellness Solutions
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed"
            variants={staggerItem}
          >
            From traditional Ayurvedic care to modern integrative medicine, we offer holistic treatments tailored to your unique needs
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <motion.div 
              className="inline-flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div 
                className="rounded-full h-10 sm:h-12 w-10 sm:w-12 border-4 border-primary/20 border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-sm sm:text-base text-gray-600 font-medium">Loading services...</span>
            </motion.div>
          </div>
        ) : services.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground">No services available at the moment.</p>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4 sm:gap-6">
                {services.map((service, index) => (
                  <div
                    key={service._id}
                    className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                  >
                    <Link href={`/services/${service._id}`}>
                      <Card
                        className="group relative overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer h-full bg-white"
                      >
                        {/* Service Image */}
                        <div className="relative h-48 sm:h-56 overflow-hidden">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          
                          {/* Title Overlay on Image */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                            <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
                              {service.title}
                            </h3>
                          </div>
                        </div>

                        {/* Card Content */}
                        <CardHeader className="relative z-10 pb-3">
                          <CardDescription className="leading-relaxed text-gray-600 mt-2 line-clamp-2">
                            {service.description}
                          </CardDescription>
                        </CardHeader>
                        
                        {service.features && service.features.length > 0 && (
                          <CardContent className="relative z-10 pt-0 pb-3">
                            <ul className="space-y-2 text-sm mb-4">
                              {service.features.slice(0, 3).map((feature, idx) => (
                                <li 
                                  key={idx} 
                                  className="flex items-start text-gray-700"
                                >
                                  <span className="text-primary mr-2 mt-0.5 text-lg font-bold flex-shrink-0">
                                    ✓
                                  </span>
                                  <span className="line-clamp-1">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white border-0">
                              Explore
                              <ArrowRight size={16} className="ml-2" />
                            </Button>
                          </CardContent>
                        )}
                        
                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            {services.length > 1 && (
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
