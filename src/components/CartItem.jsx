import React from 'react';
import { motion } from 'motion/react';

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="flex flex-col sm:flex-row items-center sm:items-start bg-secondary-dark p-4 rounded-lg shadow-sm border border-border-dark mb-4"
    >
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4 flex-shrink-0"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/200x200/333333/FFFFFF?text=No+Image"; }}
      />

      <div className="flex-grow text-primary-light text-center sm:text-left min-w-[150px] w-full sm:w-auto">
        <h3 className="font-playfair text-lg sm:text-xl font-semibold mb-1">{item.name}</h3>
        <p className="font-inter text-sm text-text-muted mb-2">{formatRupiah(item.price)}</p>
      </div>

      <div className="flex items-center space-x-2 mt-4 sm:mt-0 sm:ml-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="p-2 bg-primary-dark text-primary-light rounded-full w-8 h-8 flex items-center justify-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          -
        </motion.button>
        <span className="font-inter text-base sm:text-lg font-medium text-primary-light">{item.quantity}</span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-2 bg-primary-dark text-primary-light rounded-full w-8 h-8 flex items-center justify-center shadow-sm text-sm"
        >
          +
        </motion.button>
      </div>

      <div className="flex flex-col items-center sm:items-end ml-auto mt-4 sm:mt-0 w-full sm:w-auto">
        <p className="font-playfair text-lg sm:text-xl font-bold text-accent-gold">
          {formatRupiah(item.price * item.quantity)}
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemoveItem(item.id)}
          className="mt-2 text-accent-red hover:text-red-700 transition-colors duration-200 font-inter text-sm"
        >
          Hapus
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CartItem;
