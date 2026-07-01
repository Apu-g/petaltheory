'use client';

import { motion } from 'framer-motion';

const FEATURES = [
  {
    emoji: '✋',
    title: 'Handcrafted',
    description: 'Every petal is shaped by hand with meticulous care and attention to detail.',
  },
  {
    emoji: '🎨',
    title: 'Custom Colors',
    description: 'Choose from our palette or request custom colors to match your vision.',
  },
  {
    emoji: '🚚',
    title: 'Fast Delivery',
    description: 'Carefully packed and shipped to your doorstep within 3-5 business days.',
  },
  {
    emoji: '💝',
    title: 'Gift Ready',
    description: 'Each arrangement comes beautifully wrapped — ready to gift instantly.',
  },
  {
    emoji: '♾️',
    title: 'Everlasting',
    description: 'Unlike real flowers, our creations never wilt — beauty that lasts forever.',
  },
  {
    emoji: '💬',
    title: 'WhatsApp Support',
    description: 'Quick responses and personal attention via WhatsApp for all enquiries.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 px-6 bg-cream-dark/40">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-xl text-3xl sm:text-4xl md:text-5xl text-gold-dark mb-4">
            Why Petal Theory?
          </h2>
          <p className="text-charcoal-light text-lg max-w-md mx-auto">
            Crafting smiles, one bloom at a time
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {FEATURES.map((feat, i) => (
            <motion.div
              key={i}
              className="glass-card rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300 group"
              variants={cardVariants}
              whileHover={{ y: -4 }}
            >
              <motion.div
                className="text-4xl mb-4"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                {feat.emoji}
              </motion.div>
              <h3 className="heading-lg text-lg text-charcoal mb-2 group-hover:text-gold-dark transition-colors">
                {feat.title}
              </h3>
              <p className="text-charcoal-light text-sm leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
