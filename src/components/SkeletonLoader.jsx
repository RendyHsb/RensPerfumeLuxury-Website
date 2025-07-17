import React from 'react';
import { motion } from 'motion/react';

const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 max-w-7xl mx-auto">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-luxury-ivory/50 rounded-lg shadow-md overflow-hidden animate-pulse border border-luxury-gold/30"
        >
          {/* Area gambar skeleton */}
          <div className="w-full h-64 bg-luxury-gold/20"></div>
          <div className="p-6">
            {/* Area judul skeleton */}
            <div className="h-6 bg-luxury-gold/30 rounded w-3/4 mb-4"></div>
            {/* Area teks deskripsi skeleton */}
            <div className="h-4 bg-luxury-gold/20 rounded w-full mb-2"></div>
            <div className="h-4 bg-luxury-gold/20 rounded w-5/6 mb-4"></div>
            {/* Area harga skeleton */}
            <div className="h-5 bg-luxury-gold/30 rounded w-1/3"></div>
            {/* Area tombol skeleton */}
            <div className="mt-6 flex justify-end space-x-4">
              <div className="h-10 w-24 bg-luxury-gold/20 rounded-md"></div>
              <div className="h-10 w-24 bg-luxury-gold/30 rounded-md"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
