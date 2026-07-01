'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function PhotoModal({ product, onClose }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors text-xl font-bold"
          aria-label="Close photo view"
        >
          ✕
        </button>

        {/* Modal Content */}
        <motion.div
          className="relative max-w-3xl w-full max-h-[85vh] bg-cream rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-[60vh] sm:h-[70vh] bg-charcoal">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <div className="p-4 sm:p-6 bg-white flex items-center justify-between gap-4 border-t border-gold/20">
            <div>
              <h3 className="heading-lg text-lg sm:text-xl text-charcoal font-semibold">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-light">
                {product.description}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xl sm:text-2xl font-bold text-gold-dark">
                ₹{product.price}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
