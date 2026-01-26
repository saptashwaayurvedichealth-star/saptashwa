'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { ArrowLeft, Calendar, User } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  image?: string;
  createdAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchBlog(params.id as string);
    }
  }, [params.id]);

  const fetchBlog = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs/${id}`);
      const data = await res.json();
      setBlog(data.blog);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blogs" className="text-emerald-600 hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={20} />
            Back to Blogs
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30">
      <Navigation />
      
      <article className="py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          {/* Back Button */}
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Blogs
          </Link>

          {/* Featured Image */}
          {blog.image && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          )}

          {/* Blog Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                {blog.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {formatDate(blog.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <User size={16} />
                  {blog.author}
                </span>
              </div>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {blog.title}
            </h1>
          </header>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8">
              <div 
                className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                style={{ fontSize: '1.125rem', lineHeight: '1.8' }}
              >
                {blog.content}
              </div>
            </div>
          </div>

          {/* Author Info */}
          <div className="mt-12 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {blog.author.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Written by</h3>
                <p className="text-emerald-700 font-medium">{blog.author}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
            >
              <ArrowLeft size={20} />
              View All Blogs
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
