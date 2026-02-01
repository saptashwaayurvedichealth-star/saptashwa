'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, Play, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useToast } from '@/hooks/use-toast';

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
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    patientName: '',
    description: '',
    rating: 5,
    treatment: '',
  })
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

  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          isActive: false, // Pending approval
          isFeatured: false,
        }),
      })

      if (res.ok) {
        toast({
          title: 'Thank you!',
          description: 'Your testimonial has been submitted for review.',
        })
        setFormData({
          patientName: '',
          description: '',
          rating: 5,
          treatment: '',
        })
        setShowForm(false)
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit testimonial. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
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

        {/* Submit Testimonial Button */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-300 to-yellow-400 text-foreground rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare className="w-5 h-5" />
            {showForm ? 'Close Form' : 'Share Your Experience'}
          </motion.button>
        </motion.div>

        {/* Testimonial Submission Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <Card className="border-2 border-yellow-400/30">
              <CardContent className="p-6">
                <h3 className="font-serif text-2xl mb-4 bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  Share Your Experience
                </h3>
                <form onSubmit={handleSubmitTestimonial} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Treatment/Service *</label>
                    <input
                      type="text"
                      required
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                      placeholder="e.g., Ayurvedic Treatment"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Experience *</label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none min-h-[120px]"
                      placeholder="Share your experience with us..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Rating *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= formData.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-300 to-yellow-400 text-foreground rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Submit Testimonial'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

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
