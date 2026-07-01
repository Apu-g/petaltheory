'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const FEATURES = [
  { emoji: '🌸', label: '100% Handmade' },
  { emoji: '✨', label: 'Premium Quality' },
  { emoji: '🎁', label: 'Perfect Gifting' },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 px-6 bg-cream overflow-hidden"
    >
      {/* Decorative top divider */}
      <div className="section-divider mb-16" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <Image
            src="/images/logo.jpg"
            alt="Petal Theory Logo"
            width={140}
            height={140}
            className="mx-auto rounded-full shadow-lg shadow-gold/20 border-2 border-gold/30"
          />
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="heading-xl text-3xl sm:text-4xl md:text-5xl text-gold-dark mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="gold-underline">Petal Theory</span>
        </motion.h2>

        {/* Story */}
        <motion.p
          className="text-lg sm:text-xl text-charcoal-light leading-relaxed max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          We believe every bloom tells a story. Each handcrafted arrangement is 
          lovingly made with premium materials, bringing the beauty of nature 
          into your home — without ever wilting. From stunning bouquets to 
          adorable keychains, Petal Theory is where art meets heart.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {FEATURES.map((feat, i) => (
            <motion.div
              key={i}
              className="glass-card px-6 py-3 rounded-full flex items-center gap-2 text-base sm:text-lg font-medium text-gold-dark shadow-sm hover:shadow-md transition-shadow"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease: 'easeOut' },
                },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xl">{feat.emoji}</span>
              <span>{feat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative bottom divider */}
      <div className="section-divider mt-16" />
    </section>
  );
}
