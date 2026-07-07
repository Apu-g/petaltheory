'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Mobile / phone view slides (images-2 folder)
const MOBILE_SLIDES = [
  { src: '/images-2/WhatsApp Image 2026-07-02 at 15.31.18.jpeg', alt: 'Petal Theory Bouquet 1' },
  { src: '/images-2/WhatsApp Image 2026-07-02 at 15.31.18 (1).jpeg', alt: 'Petal Theory Bouquet 2' },
  { src: '/images-2/WhatsApp Image 2026-07-02 at 15.31.18 (2).jpeg', alt: 'Petal Theory Bouquet 3' },
  { src: '/images-2/WhatsApp Image 2026-07-02 at 15.31.37.jpeg', alt: 'Petal Theory Arrangement 1' },
  { src: '/images-2/WhatsApp Image 2026-07-02 at 15.31.37 (1).jpeg', alt: 'Petal Theory Arrangement 2' },
];

// Desktop / landscape view slides (web-landscape-images folder)
const DESKTOP_SLIDES = [
  { src: '/web-landscape-images/ChatGPT Image Jul 7, 2026, 10_46_17 AM.png', alt: 'Petal Theory Collection 1' },
  { src: '/web-landscape-images/ChatGPT Image Jul 7, 2026, 10_48_14 AM.png', alt: 'Petal Theory Collection 2' },
  { src: '/web-landscape-images/ChatGPT Image Jul 7, 2026, 10_50_14 AM.png', alt: 'Petal Theory Collection 3' },
  { src: '/web-landscape-images/ChatGPT Image Jul 7, 2026, 10_52_36 AM.png', alt: 'Petal Theory Collection 4' },
  { src: '/web-landscape-images/ChatGPT Image Jul 7, 2026, 10_54_29 AM.png', alt: 'Petal Theory Collection 5' },
];

const HEADLINE_WORDS = ['Where', 'Flowers', 'Bloom,', 'Art', 'Lives'];

// Decorative petal positions
const PETALS = [
  { left: '10%', top: '20%', delay: 0, size: 20 },
  { left: '80%', top: '15%', delay: 1.5, size: 16 },
  { left: '25%', top: '70%', delay: 3, size: 24 },
  { left: '70%', top: '65%', delay: 0.8, size: 18 },
  { left: '50%', top: '30%', delay: 2.2, size: 14 },
  { left: '90%', top: '50%', delay: 1, size: 22 },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile vs desktop on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const SLIDES = isMobile ? MOBILE_SLIDES : DESKTOP_SLIDES;

  // Reset slide index when switching between mobile/desktop
  useEffect(() => {
    setCurrent(0);
  }, [isMobile]);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, [SLIDES.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] h-screen overflow-hidden bg-charcoal"
    >
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            fill
            className="object-cover object-center"
            priority={current === 0}
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Petals */}
      {PETALS.map((petal, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none opacity-60"
          style={{ left: petal.left, top: petal.top }}
          animate={{
            y: [0, -20, -10, -30, 0],
            rotate: [0, 45, 90, 135, 0],
            opacity: [0.4, 0.7, 0.5, 0.8, 0.4],
          }}
          transition={{
            duration: 6 + i,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span
            style={{ fontSize: petal.size }}
            className="text-rose-light drop-shadow-lg"
          >
            🌸
          </span>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Animated Headline */}
        <motion.h1
          className="heading-xl text-4xl sm:text-5xl md:text-7xl text-white mb-6 drop-shadow-xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-3 md:mr-4"
              variants={{
                hidden: { opacity: 0, y: 40, rotateX: -60 },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-lg sm:text-xl text-white/80 max-w-lg mb-10 font-light tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Handmade with love, designed to last forever
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <a
            href="#products"
            className="btn-rose text-base sm:text-lg px-8 py-3 inline-flex items-center gap-2"
          >
            <span>🌸</span> Explore Collection
          </a>
          <a
            href="#about"
            className="btn-gold-outline text-base sm:text-lg px-8 py-3 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm"
          >
            Our Story
          </a>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-24 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i === current
                  ? 'bg-gold w-6'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
