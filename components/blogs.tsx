'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, User, ArrowRight, Eye } from 'lucide-react'
import Link from 'next/link'

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
          <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent font-semibold">Our Blog</span>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent mt-2">
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
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Card key={blog._id} className="hover:shadow-lg transition-shadow overflow-hidden">
                {blog.image ? (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="bg-blue-100 h-48 flex items-center justify-center">
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
                  <CardTitle className="text-xl hover:text-primary transition-colors">
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{blog.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="inline-block bg-blue-100 text-primary text-xs px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-600">
                      <Eye size={14} className="mr-1" />
                      <span>{blog.views}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Read More
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
