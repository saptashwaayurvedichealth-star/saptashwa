'use client';

import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());

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

  return (
    <section id="products" className="py-20 lg:py-32 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-secondary mb-2 inline-block">Premium Wellness</span>
          <h2 className="font-serif text-4xl lg:text-5xl font-light mb-4 text-pretty">
            Curated wellness products
          </h2>
          <p className="text-muted-foreground text-lg">
            Premium, authentic medical and wellness products crafted with care
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product._id}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300"
              >
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
                    <Button size="sm" className="flex items-center gap-1.5">
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add to Cart</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
    </section>
  );
}
