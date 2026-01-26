'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, DollarSign, ArrowRight } from 'lucide-react'

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
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold">Our Treatments</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            Specialized Medical Treatments
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We offer a wide range of specialized treatments using the latest medical technology 
            and techniques to ensure the best outcomes for our patients.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment) => (
              <Link key={treatment._id} href={`/treatments/${treatment._id}`}>
                <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer group">
                  <CardHeader>
                    {treatment.image ? (
                      <div className="rounded-lg h-48 overflow-hidden mb-4">
                        <img 
                          src={treatment.image} 
                          alt={treatment.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="bg-blue-100 rounded-lg h-48 flex items-center justify-center mb-4">
                        <span className="text-6xl">💉</span>
                      </div>
                    )}
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{treatment.title}</CardTitle>
                    <CardDescription>{treatment.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
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
            ))}
          </div>
        )}

        {!loading && treatments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No treatments available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
