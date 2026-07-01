'use client';

import { motion } from 'framer-motion';

const CATEGORIES = [
  { key: null, label: 'All', emoji: '✨' },
  { key: 'flower', label: 'Flowers', emoji: '🌸' },
  { key: 'keychain', label: 'Keychains', emoji: '🔑' },
];

export default function CategoryFilter({ active, onSelect }) {
  return (
    <div className="flex justify-center gap-3 sm:gap-4 mb-10">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.key;
        return (
          <button
            key={cat.key ?? 'all'}
            onClick={() => onSelect(cat.key)}
            className={`relative px-5 sm:px-7 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
              isActive
                ? 'text-white shadow-lg'
                : 'text-charcoal-light hover:text-gold-dark bg-white/60 hover:bg-white/80'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="category-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-gold-dark"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
