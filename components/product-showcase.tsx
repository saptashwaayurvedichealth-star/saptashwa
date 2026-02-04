'use client';

import { Mail, Heart, Star, X, ShoppingBag, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useToast } from '@/hooks/use-toast';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface Product {
  _id: string
  name: string
  description: string
  shortDescription: string
  image: string
  price: number
  compareAtPrice?: number
  category: string
  brand?: string
  stock: number
  isFeatured: boolean
}

export default function ProductShowcase() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [enquiryData, setEnquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
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
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?isActive=true')
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleWishlist = (id: string) => {
    const newSet = new Set(wishlisted);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setWishlisted(newSet);
  };

  const handleEnquiryClick = (product: Product) => {
    setSelectedProduct(product);
    setEnquiryData({
      name: '',
      email: '',
      phone: '',
      message: `I am interested in ${product.name}. Please provide more details about pricing, availability, and how to purchase.`,
    });
    setShowEnquiryModal(true);
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquiryLoading(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...enquiryData,
          subject: `Product Enquiry: ${selectedProduct?.name}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowEnquiryModal(false);
        setShowSuccessModal(true);
        setEnquiryData({ name: '', email: '', phone: '', message: '' });
        setSelectedProduct(null);
      } else {
        throw new Error(data.error || 'Failed to submit enquiry');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setEnquiryLoading(false);
    }
  };

  return (
    <section id="products" className="py-20 lg:py-32 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.span 
            className="text-sm font-medium text-secondary mb-2 inline-block"
            variants={staggerItem}
          >
            Premium Wellness
          </motion.span>
          <motion.h2 
            className="font-serif text-4xl lg:text-5xl font-light mb-4 text-pretty heading-gradient"
            variants={staggerItem}
          >
            Curated wellness products
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            variants={staggerItem}
          >
            Premium, authentic medical and wellness products crafted with care
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available at the moment.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4 sm:gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                  >
                    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                      {/* Product Image */}
                      {product.image ? (
                        <div className="relative w-full aspect-square overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Wishlist button overlay */}
                          <button
                            onClick={() => toggleWishlist(product._id)}
                            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition shadow-lg"
                          >
                            <Heart
                              className="w-4 h-4"
                              fill={wishlisted.has(product._id) ? 'currentColor' : 'none'}
                              color={wishlisted.has(product._id) ? '#ef4444' : '#999'}
                            />
                          </button>
                          
                          {/* Discount Badge if applicable */}
                          {product.compareAtPrice && product.compareAtPrice > product.price && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                              {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full aspect-square bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center">
                          <span className="text-6xl">🌿</span>
                        </div>
                      )}

                      {/* Product Info */}
                      <CardContent className="p-4">
                        <div className="mb-3">
                          <p className="text-xs font-medium text-secondary mb-1">
                            {product.category}
                          </p>
                          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
                        </div>

                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex flex-col">
                            <span className="font-serif text-lg font-semibold text-foreground">
                              ₹{product.price}
                            </span>
                            {product.compareAtPrice && (
                              <span className="text-xs text-muted-foreground line-through">
                                ₹{product.compareAtPrice}
                              </span>
                            )}
                          </div>
                          <Button 
                            size="sm" 
                            className="flex items-center gap-1.5"
                            onClick={() => handleEnquiryClick(product)}
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Enquiry</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            {products.length > 1 && (
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

        {/* View All CTA */}
        {products.length > 0 && (
          <div className="text-center pt-12">
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full"
              onClick={() => window.location.href = '/products'}
            >
              Browse Full Marketplace
            </Button>
          </div>
        )}
      </div>

      {/* Enquiry Modal */}
      {showEnquiryModal && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-auto overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-primary/5 to-primary/5 sticky top-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <ShoppingBag className="w-5 sm:w-6 h-5 sm:h-6 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 truncate">Product Enquiry</h3>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{selectedProduct.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowEnquiryModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 p-1"
              >
                <X className="w-5 sm:w-6 h-5 sm:h-6" />
              </button>
            </div>

            <form onSubmit={handleEnquirySubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              {/* Product Summary */}
              <div className="bg-gray-50 border border-primary/10 rounded-lg p-3 sm:p-4 flex gap-3 sm:gap-4">
                {selectedProduct.image && (
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900 truncate">{selectedProduct.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">{selectedProduct.category}</p>
                  <p className="text-base sm:text-lg font-bold text-primary mt-2">₹{selectedProduct.price}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={enquiryData.name}
                  onChange={(e) => setEnquiryData({ ...enquiryData, name: e.target.value })}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={enquiryData.email}
                    onChange={(e) => setEnquiryData({ ...enquiryData, email: e.target.value })}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={enquiryData.phone}
                    onChange={(e) => setEnquiryData({ ...enquiryData, phone: e.target.value })}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Your Message *
                </label>
                <textarea
                  value={enquiryData.message}
                  onChange={(e) => setEnquiryData({ ...enquiryData, message: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  placeholder="Ask about pricing, availability, how to purchase, etc."
                />
              </div>

              <div className="flex gap-2 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEnquiryModal(false)}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={enquiryLoading}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-primary text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50"
                >
                  {enquiryLoading ? 'Sending...' : 'Send Enquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Sent Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for your enquiry. Our team will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:shadow-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
