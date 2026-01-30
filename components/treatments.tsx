'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, DollarSign, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

interface Treatment {
  _id: string
  title: string
  description: string
  shortDescription: string
  image: string
  price: number
  duration: string
  category: string
}

export function Treatments() {
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [loading, setLoading] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start',
      slidesToScroll: 1,
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
    fetchTreatments()
  }, [])

  const fetchTreatments = async () => {
    try {
      const response = await fetch('/api/treatments')
      const data = await response.json()
      // Filter only active treatments
      const activeTreatments = (data.treatments || []).filter((t: Treatment & { isActive?: boolean }) => t.isActive !== false)
      setTreatments(activeTreatments)
    } catch (error) {
      console.error('Failed to fetch treatments:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="treatments" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.span 
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent font-semibold"
            variants={staggerItem}
          >
            Our Treatments
          </motion.span>
          <motion.h2 
            className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent mt-2"
            variants={staggerItem}
          >
            Specialized Medical Treatments
          </motion.h2>
          <motion.p 
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
            variants={staggerItem}
          >
            We offer a wide range of specialized treatments using the latest medical technology 
            and techniques to ensure the best outcomes for our patients.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : treatments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No treatments available at the moment.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4 sm:gap-6">
                {treatments.map((treatment) => (
                  <div
                    key={treatment._id}
                    className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                  >
                    <Link href={`/treatments/${treatment._id}`}>
                      <Card className="group hover:shadow-lg transition-shadow h-full cursor-pointer">
                        {/* Treatment Image */}
                        {treatment.image ? (
                          <div className="relative h-48 sm:h-56 overflow-hidden">
                            <img 
                              src={treatment.image} 
                              alt={treatment.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            
                            {/* Title Overlay on Image */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                              <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
                                {treatment.title}
                              </h3>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-blue-100 h-48 sm:h-56 flex items-center justify-center">
                            <span className="text-6xl">💉</span>
                          </div>
                        )}

                        <CardHeader className="pb-3">
                          <CardDescription className="line-clamp-2">{treatment.shortDescription}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <Clock size={16} className="mr-1" />
                              <span>{treatment.duration}</span>
                            </div>
                            <div className="flex items-center font-semibold text-blue-600">
                              <DollarSign size={16} />
                              <span>{treatment.price}</span>
                            </div>
                          </div>
                          <span className="inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                            {treatment.category}
                          </span>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" variant="outline">
                            Learn More
                            <ArrowRight size={16} className="ml-2" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            {treatments.length > 1 && (
              <>
                <button
                  onClick={scrollPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
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
  )
}
