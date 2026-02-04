'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, User, ArrowRight, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

interface Blog {
  _id: string
  title: string
  slug: string
  description: string
  image: string
  author: string
  category: string
  publishedAt: string
  views: number
}

export function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
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
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?status=published')
      const data = await response.json()
      setBlogs(data.blogs || [])
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="blogs" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="heading-gradient font-semibold">Our Blog</span>
          <h2 className="text-4xl font-bold heading-gradient mt-2">
            Latest Health Tips & News
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Stay informed with our latest articles on health, wellness, and medical advances.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts available at the moment.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4 sm:gap-6">
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                  >
                    <Card className="group hover:shadow-lg transition-shadow overflow-hidden h-full">
                      {/* Blog Image */}
                      {blog.image ? (
                        <div className="relative h-48 sm:h-56 overflow-hidden">
                          <img 
                            src={blog.image} 
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          
                          {/* Category badge */}
                          <div className="absolute top-4 left-4">
                            <span className="inline-block bg-primary text-white text-xs px-3 py-1 rounded-full shadow-lg">
                              {blog.category}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-blue-100 h-48 sm:h-56 flex items-center justify-center">
                          <span className="text-6xl">📰</span>
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Calendar size={14} className="mr-1" />
                          <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <User size={14} className="mr-1" />
                          <span>{blog.author}</span>
                        </div>
                        <CardTitle className="text-xl hover:text-primary transition-colors line-clamp-2">
                          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-2">{blog.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-600">
                            <Eye size={14} className="mr-1" />
                            <span>{blog.views} views</span>
                          </div>
                          <Button size="sm" variant="outline">
                            Read More
                            <ArrowRight size={16} className="ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            {blogs.length > 1 && (
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
  )
}
