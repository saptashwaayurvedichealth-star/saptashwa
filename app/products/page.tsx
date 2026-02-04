'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import WhatsAppFloat from '@/components/whatsapp-float';
import PageHeader from '@/components/page-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, X, CheckCircle2, ShoppingBag } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  ingredients?: string[];
  benefits?: string[];
  shortDescription?: string;
}

export default function ProductsPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
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
    <main className="min-h-screen">
      <Navigation />
      <PageHeader 
        title="Our Products"
        subtitle="Premium Ayurvedic wellness products for your health and vitality"
        badge="Natural Wellness"
      />
      
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card key={product._id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  {product.image && (
                    <div className="h-64 overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    
                    <h3 className="font-serif text-2xl font-semibold mb-3 text-gray-900">{product.name}</h3>
                    <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                      {product.shortDescription || product.description}
                    </p>

                    {product.benefits && product.benefits.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-gray-900">Benefits:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {product.benefits.slice(0, 3).map((benefit, idx) => (
                            <li key={idx}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                      </div>
                      <Button 
                        onClick={() => handleEnquiryClick(product)}
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Enquire & Purchase
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Enquiry Modal */}
      {showEnquiryModal && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-primary/5 to-primary/5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
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
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-4">
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
                  <p className="text-lg font-bold text-primary mt-2">₹{selectedProduct.price}</p>
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
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
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50"
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
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="bg-gradient-to-br from-primary/10 via-primary/8 to-primary/10 p-8 text-center">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-40 animate-pulse"></div>
                <div className="relative bg-primary rounded-full p-6 shadow-xl">
                  <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Enquiry Sent Successfully! 🎉
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Thank you for your interest! Our team will get back to you within <span className="font-semibold text-primary">24 hours</span> with product details, pricing, and purchase information.
              </p>
              
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-primary/80">
                  📧 Confirmation email sent to <span className="font-semibold">{enquiryData.email}</span>
                </p>
              </div>

              <Button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Got it, Thanks!
              </Button>
            </div>
          </div>
        </div>
      )}

      <WhatsAppFloat />
      <Footer />
    </main>
  );
}
