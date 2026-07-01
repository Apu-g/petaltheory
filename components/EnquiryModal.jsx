'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';

export default function EnquiryModal({ product, onClose }) {
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | success | error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitState('loading');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          productName: product.name,
          price: product.price,
        }),
      });

      if (res.ok) {
        setSubmitState('success');
      } else {
        setSubmitState('error');
      }
    } catch {
      setSubmitState('error');
    }
  };

  const handleClose = () => {
    setSubmitState('idle');
    reset();
    onClose();
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Card */}
          <motion.div
            className="relative w-full max-w-md bg-cream rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-charcoal hover:bg-white transition-colors"
            >
              ✕
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-4 bg-gradient-to-r from-gold/10 to-rose/10">
              <div className="w-12 h-1 bg-charcoal/20 rounded-full mx-auto mb-4 sm:hidden" />
              <h3 className="heading-lg text-2xl text-gold-dark">
                Enquire Now
              </h3>
              <p className="text-charcoal-light mt-1 text-sm">
                {product.name} · <span className="font-semibold text-gold-dark">₹{product.price}</span>
              </p>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              {submitState === 'success' ? (
                /* Success State */
                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <motion.div
                    className="text-5xl mb-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
                  >
                    ✅
                  </motion.div>
                  <h4 className="heading-lg text-xl text-charcoal mb-2">
                    Enquiry Saved!
                  </h4>
                  <p className="text-charcoal-light text-sm mb-4 px-4">
                    Thank you! We have received your contact details and product enquiry on our dashboard.
                  </p>
                  <a
                    href="tel:7338412124"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose to-rose-dark text-white font-medium text-sm shadow-sm hover:opacity-95 transition-all"
                  >
                    <span>📞</span> Call Us Direct: 7338412124
                  </a>
                </motion.div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      Your Name
                    </label>
                    <motion.input
                      id="enquiry-name"
                      type="text"
                      placeholder="Enter your name"
                      className={`w-full px-4 py-3 rounded-xl bg-white border transition-all outline-none text-charcoal ${
                        errors.name
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-gold/20 focus:border-gold focus:ring-2 focus:ring-gold/10'
                      }`}
                      animate={errors.name ? { x: [0, -8, 8, -4, 4, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      {...register('name', {
                        required: 'Name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters',
                        },
                        pattern: {
                          value: /^[a-zA-Z\s]+$/,
                          message: 'Only letters allowed',
                        },
                      })}
                    />
                    {errors.name && (
                      <motion.p
                        className="text-red-500 text-xs mt-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="enquiry-phone"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      Phone Number
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gold/20 bg-gold/5 text-charcoal-light text-sm">
                        +91
                      </span>
                      <motion.input
                        id="enquiry-phone"
                        type="tel"
                        placeholder="10-digit number"
                        className={`w-full px-4 py-3 rounded-r-xl bg-white border transition-all outline-none text-charcoal ${
                          errors.phone
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-gold/20 focus:border-gold focus:ring-2 focus:ring-gold/10'
                        }`}
                        animate={errors.phone ? { x: [0, -8, 8, -4, 4, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        maxLength={10}
                        {...register('phone', {
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: 'Enter a valid 10-digit Indian number',
                          },
                        })}
                      />
                    </div>
                    {errors.phone && (
                      <motion.p
                        className="text-red-500 text-xs mt-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.phone.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Product (read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Product
                    </label>
                    <div className="px-4 py-3 rounded-xl bg-gold/5 border border-gold/20 text-charcoal-light text-sm">
                      {product.name} — ₹{product.price}
                    </div>
                  </div>

                  {/* Error State */}
                  {submitState === 'error' && (
                    <motion.p
                      className="text-red-500 text-sm text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Something went wrong. Please try again.
                    </motion.p>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={submitState === 'loading'}
                    className="w-full btn-rose text-base py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    whileTap={{ scale: 0.98 }}
                  >
                    {submitState === 'loading' ? (
                      <motion.span
                        className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Enquiry
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
