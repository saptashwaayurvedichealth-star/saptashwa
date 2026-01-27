'use client';

import { Mail, Heart, Star, X, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useToast } from '@/hooks/use-toast';

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
            className="font-serif text-4xl lg:text-5xl font-light mb-4 text-pretty"
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
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  {/* Product Image */}
                  {product.image ? (
                    <div className="w-full aspect-square overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-square bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
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

                    <div className="flex items-center justify-between mb-3">
                      <button
                        onClick={() => toggleWishlist(product._id)}
                        className="p-1.5 hover:bg-muted rounded-full transition"
                      >
                        <Heart
                          className="w-4 h-4"
                          fill={wishlisted.has(product._id) ? 'currentColor' : 'none'}
                          color={wishlisted.has(product._id) ? '#ef4444' : '#999'}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="font-serif text-lg font-semibold text-foreground">
                          ${product.price}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            ${product.compareAtPrice}
                          </span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        className="flex items-center gap-1.5"
                        onClick={() => handleEnquiryClick(product)}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Send Enquiry</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available at the moment.</p>
          </div>
        )}

        {/* View All CTA */}
        {products.length > 0 && (
          <div className="text-center pt-12">
            <Button variant="outline" size="lg" className="rounded-full">
              Browse Full Marketplace
            </Button>
          </div>
        )}
      </div>

      {/* Enquiry Modal */}
      {showEnquiryModal && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-emerald-50 to-teal-50">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-emerald-600" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Product Enquiry</h3>
                  <p className="text-sm text-gray-600">{selectedProduct.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowEnquiryModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleEnquirySubmit} className="p-6 space-y-5">
              {/* Product Summary */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex gap-4">
                {selectedProduct.image && (
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{selectedProduct.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{selectedProduct.category}</p>
                  <p className="text-lg font-bold text-emerald-600 mt-2">${selectedProduct.price}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={enquiryData.name}
                  onChange={(e) => setEnquiryData({ ...enquiryData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={enquiryData.email}
                    onChange={(e) => setEnquiryData({ ...enquiryData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={enquiryData.phone}
                    onChange={(e) => setEnquiryData({ ...enquiryData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  value={enquiryData.message}
                  onChange={(e) => setEnquiryData({ ...enquiryData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  placeholder="Ask about pricing, availability, how to purchase, etc."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEnquiryModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={enquiryLoading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 disabled:opacity-50"
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
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Sent Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for your enquiry. Our team will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg transition"
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
