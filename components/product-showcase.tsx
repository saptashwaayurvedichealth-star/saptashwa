'use client';

import { ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';

const products = [
  {
    name: 'Ashwagandha Wellness Blend',
    category: 'Stress Relief',
    price: '$45',
    rating: 4.8,
    image: '🌿'
  },
  {
    name: 'Golden Turmeric Latte',
    category: 'Immunity Boost',
    price: '$32',
    rating: 4.9,
    image: '🌾'
  },
  {
    name: 'Brahmi Mind Serum',
    category: 'Cognitive Support',
    price: '$58',
    rating: 4.7,
    image: '✨'
  },
  {
    name: 'Neem Pure Oil',
    category: 'Skin Care',
    price: '$28',
    rating: 4.8,
    image: '🫗'
  },
  {
    name: 'Triphala Detox Tea',
    category: 'Digestion',
    price: '$22',
    rating: 4.9,
    image: '🍵'
  },
  {
    name: 'Shilajit Pure Extract',
    category: 'Vitality',
    price: '$64',
    rating: 4.9,
    image: '💎'
  },
  {
    name: 'Herbal Sleep Blend',
    category: 'Rest & Recovery',
    price: '$38',
    rating: 4.8,
    image: '🌙'
  },
  {
    name: 'Ayurvedic Face Mask',
    category: 'Skincare',
    price: '$42',
    rating: 4.7,
    image: '🧴'
  },
];

export default function ProductShowcase() {
  const [wishlisted, setWishlisted] = useState<Set<number>>(new Set());

  const toggleWishlist = (index: number) => {
    const newSet = new Set(wishlisted);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
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
            Premium, authentic Ayurvedic formulations crafted with the finest natural ingredients
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Product Image */}
              <div className="w-full aspect-square bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-6xl">{product.image}</span>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-xs font-medium text-secondary mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif font-semibold text-foreground text-sm mb-3 line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                  <div className="text-sm">
                    <span className="font-semibold text-foreground">{product.rating}</span>
                    <span className="text-xs text-muted-foreground"> ★</span>
                  </div>
                  <button
                    onClick={() => toggleWishlist(index)}
                    className="p-1 hover:bg-muted rounded transition"
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={wishlisted.has(index) ? 'currentColor' : 'none'}
                      color={wishlisted.has(index) ? '#ef4444' : '#999'}
                    />
                  </button>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-serif text-lg font-semibold text-foreground">
                    {product.price}
                  </span>
                  <button className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:opacity-90 transition flex items-center justify-center gap-1.5">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center pt-12">
          <button className="px-8 py-3 border border-primary text-primary rounded-full font-medium hover:bg-primary/5 transition">
            Browse Full Marketplace
          </button>
        </div>
      </div>
    </section>
  );
}
