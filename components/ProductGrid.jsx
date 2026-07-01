'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';
import EnquiryModal from './EnquiryModal';
import { getProducts } from '@/lib/products';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const data = await getProducts(category);
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();

    const handleFocus = async () => {
      const data = await getProducts(category);
      setProducts(data);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [category]);

  return (
    <section id="products" className="py-20 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-xl text-3xl sm:text-4xl md:text-5xl text-gold-dark mb-4">
            Our Collection
          </h2>
          <p className="text-charcoal-light text-lg max-w-md mx-auto">
            Each piece is handcrafted with love — browse our curated arrangements
          </p>
        </motion.div>

        {/* Category Filter */}
        <CategoryFilter active={category} onSelect={setCategory} />

        {/* Product Grid */}
        {loading ? (
          /* Loading Skeleton */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-cream-dark rounded-2xl aspect-[4/5] mb-4" />
                <div className="h-5 bg-cream-dark rounded w-3/4 mb-2" />
                <div className="h-4 bg-cream-dark rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onEnquire={setSelectedProduct}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && products.length === 0 && (
          <motion.p
            className="text-center text-charcoal-light py-16 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No products found in this category yet.
          </motion.p>
        )}
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
