'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Leaf, Stethoscope, Zap, Droplet, Brain, Flower2, Heart, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

interface Service {
  _id: string
  title: string
  description: string
  icon: string
  image: string
  features: string[]
  order: number
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
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

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
    <section id="services" className="py-20 lg:py-32 bg-gradient-to-b from-white via-primary/10 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4"
            variants={staggerItem}
          >
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">Our Specialties</span>
          </motion.div>
          <motion.h2 
            className="font-serif text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent"
            variants={staggerItem}
          >
            Comprehensive Wellness Solutions
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg leading-relaxed"
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
                className="rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-gray-600 font-medium">Loading services...</span>
            </motion.div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Heart
              return (
                <motion.div
                  key={service._id}
                  variants={staggerItem}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/services/${service._id}`}>
                    <Card
                      className="group relative overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer h-full bg-white"
                    >
                      {/* Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <CardHeader className="relative z-10">
                        <motion.div 
                          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center mb-4 shadow-lg"
                          whileHover={{ 
                            scale: 1.15,
                            rotate: [0, -10, 10, 0],
                            boxShadow: "0 20px 40px rgba(var(--primary-rgb), 0.4)"
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <Icon className="w-8 h-8" />
                        </motion.div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="leading-relaxed text-gray-600 mt-2">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      {service.features && service.features.length > 0 && (
                        <CardContent className="relative z-10">
                          <ul className="space-y-3 text-sm">
                            {service.features.slice(0, 3).map((feature, idx) => (
                              <motion.li 
                                key={idx} 
                                className="flex items-start text-gray-700"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <motion.span 
                                  className="text-primary mr-3 mt-0.5 text-xl font-bold"
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: idx * 0.1 + 0.2, type: "spring" }}
                                >
                                  ✓
                                </motion.span>
                                {feature}
                              </motion.li>
                            ))}
                          </ul>
                        </CardContent>
                      )}
                      
                      {/* Arrow Icon */}
                      <motion.div 
                        className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        <Activity className="w-5 h-5" />
                      </motion.div>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {!loading && services.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground">No services available at the moment.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
