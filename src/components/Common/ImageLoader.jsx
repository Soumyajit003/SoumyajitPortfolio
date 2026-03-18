import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * A reusable image loader component that shows a shimmer effect while the image is loading.
 * Provides a "cool" and premium loading experience for photos.
 */
const ImageLoader = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Shimmer / Skeleton Animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-zinc-900 overflow-hidden"
          >
            {/* The Shimmer Effect */}
            <motion.div
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-full h-full"
            />

            {/* Placeholder Icon (Optional, adds a premium feel) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-600"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback for Error or Missing Source */}
      {(!src || hasError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 text-zinc-500 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 10h3l-4 4-4-4h3V4h2v6z" />
            <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5h2z" />
          </svg>
          <span className="text-xs font-outfit uppercase tracking-widest opacity-60">Image Unavailable</span>
        </div>
      )}

      {/* Actual Image */}
      {src && !hasError && (
        <motion.img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true); // Stop shimmer if error
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`${className} ${isLoaded ? 'block' : 'hidden'}`}
          {...props}
        />
      )}
    </div>
  );
};

export default ImageLoader;
