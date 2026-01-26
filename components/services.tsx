'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Leaf, Stethoscope, Zap, Droplet, Brain, Flower2, Heart, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    <section id="services" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary mb-2 inline-block">Our Specialties</span>
          <h2 className="font-serif text-4xl lg:text-5xl font-light mb-4 text-pretty">
            Comprehensive wellness solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            From traditional care to modern medicine, we offer integrated care for complete wellness
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Heart
              return (
                <Link key={service._id} href={`/services/${service._id}`}>
                  <Card
                    className="group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer h-full"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    {service.features && service.features.length > 0 && (
                      <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    )}
                  </Card>
                </Link>
              )
            })}
          </div>
        )}

        {!loading && services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
