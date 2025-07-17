import React from 'react';
import { motion } from 'motion/react';

const ProductCard = ({ product, onAddToCart, isAdmin, onDeleteProduct, onEditProduct }) => {
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-accent-gold' : 'text-gray-400'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      className="bg-primary-light rounded-lg shadow-lg overflow-hidden flex flex-col h-full border border-border-light"
    >
      {/* Meningkatkan tinggi gambar untuk mobile dan desktop lebih lanjut */}
      <div className="relative w-full h-72 sm:h-80 flex-shrink-0 overflow-hidden">
        <img
          src={product.images && product.images[0] ? product.images[0] : 'https://placehold.co/400x300/333333/FFFFFF?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/400x300/333333/FFFFFF?text=No+Image';
          }}
        />
        {isAdmin && (
          <div className="absolute top-2 right-2 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEditProduct(product)}
              className="p-1.5 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDeleteProduct(product.id)}
              className="p-1.5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-playfair text-xl font-semibold text-text-dark mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-text-dark text-lg font-bold mb-2">{formatRupiah(product.price)}</p>
        <div className="flex items-center mb-2">
          {renderStars(product.rating)}
          <span className="text-text-dark text-sm ml-2">{product.rating.toFixed(1)}</span>
        </div>
        <p className="text-text-dark text-sm mb-4 line-clamp-3 flex-grow">{product.description}</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(product)}
          className="mt-auto w-full bg-accent-gold text-primary-dark font-semibold py-2 rounded-md shadow-md hover:bg-accent-gold/90 transition-colors duration-200"
        >
          Tambahkan ke Keranjang
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
