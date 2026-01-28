'use client';

import { useState, useEffect } from 'react';
import { Star, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

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
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                variants={staggerItem}
              >
                <motion.div
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-8">
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
                          className="mb-4 relative bg-gray-100 rounded-lg h-48 flex items-center justify-center overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <a 
                            href={testimonial.youtubeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:text-primary/80 transition"
                          >
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Play className="w-12 h-12" />
                            </motion.div>
                            <span className="text-sm font-medium">Watch Video Testimonial</span>
                          </a>
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
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && testimonials.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground">No testimonials available at the moment.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
