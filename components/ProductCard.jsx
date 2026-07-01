'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProductCard({ product, onEnquire, index = 0 }) {
  return (
    <motion.div
      className="product-card glass-card rounded-2xl overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="product-image object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="glass-card text-xs font-medium px-3 py-1 rounded-full text-gold-dark">
            {product.category === 'flower' ? '🌸 Flower' : '🔑 Keychain'}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        <h3 className="heading-lg text-lg sm:text-xl text-charcoal mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-charcoal-light text-sm line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Price & Action CTA */}
        <div className="mb-3">
          <span className="text-2xl font-semibold text-gold-dark">
            ₹{product.price}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onEnquire(product)}
            className="w-full text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose to-rose-dark text-white font-medium text-sm shadow-sm hover:opacity-95 transition-all"
          >
            Enquire Now
          </button>
          <a
            href="tel:7338412124"
            onClick={(e) => e.stopPropagation()}
            className="w-full text-center py-2 px-3 rounded-xl border border-gold/40 bg-gold/10 hover:bg-gold/20 text-charcoal font-medium text-sm transition-all flex items-center justify-center gap-1.5"
          >
            <span>📞</span> Call Now: 7338412124
          </a>
        </div>

        {/* Gold border accent */}
        <div className="mt-4 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>
    </motion.div>
  );
}
