import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CartItem from '../components/CartItem';

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const CartPage = ({ cartItems, onUpdateQuantity, onRemoveItem, onNavigate, onCheckout }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary-light py-8 px-4 text-text-dark"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl sm:text-5xl font-playfair text-accent-gold text-center mb-8 sm:mb-12 relative">
          Keranjang Belanja Anda
          <span className="block w-20 sm:w-24 h-1 bg-accent-gold mx-auto mt-2 sm:mt-4 rounded-full"></span>
        </h2>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-10"
          >
            <p className="text-xl font-inter text-text-muted mb-6">Keranjang Anda kosong.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('home')}
              className="bg-accent-gold text-primary-dark font-playfair font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-md shadow-lg hover:bg-accent-gold/90 transition-all duration-300 text-base sm:text-lg"
            >
              Mulai Belanja
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <AnimatePresence>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={onRemoveItem}
                />
              ))}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
              className="bg-secondary-dark p-4 sm:p-6 rounded-lg shadow-md border border-border-dark mt-4 sm:mt-6"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-playfair text-xl sm:text-2xl font-bold text-primary-light">Subtotal:</span>
                <span className="font-playfair text-xl sm:text-2xl font-bold text-accent-gold">
                  {formatRupiah(subtotal)}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCheckout} 
                className="w-full bg-accent-gold text-primary-dark font-playfair font-semibold py-2 sm:py-3 rounded-md shadow-lg hover:bg-accent-gold/90 transition-all duration-300 text-base sm:text-lg"
              >
                Lanjutkan ke Pembelian
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartPage;
