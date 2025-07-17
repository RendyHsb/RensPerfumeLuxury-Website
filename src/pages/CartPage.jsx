import React from 'react';
import { motion } from 'motion/react';

const CartPage = ({ cartItems, onUpdateQuantity, onRemoveItem, onNavigate, onCheckout }) => {
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-28 sm:pt-32"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair text-primary-dark mb-6 text-center">
        Keranjang Belanja Anda
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-text-dark mb-6">Keranjang Anda kosong.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('home', '', 'info', 'all')}
            className="bg-accent-gold text-primary-dark font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-accent-gold/90 transition-colors duration-200"
          >
            Mulai Belanja
          </motion.button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={item.images && item.images[0] ? item.images[0] : `https://placehold.co/100x100/E0BBE4/FFFFFF?text=${item.name.substring(0, 5)}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/E0BBE4/FFFFFF?text=${item.name.substring(0, 5)}`; }}
                />
                <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
                  <h3 className="font-semibold text-lg text-primary-dark">{item.name}</h3>
                  <p className="text-text-dark">Rp {item.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="flex items-center space-x-2 mr-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="bg-secondary-light text-text-dark p-2 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                  </motion.button>
                  <span className="text-text-dark text-lg font-medium">{item.quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="bg-secondary-light text-text-dark p-2 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemoveItem(item.id)}
                  className="text-accent-red hover:text-red-700 p-2 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.925a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m-1.022.165L5.79 19.673a2.25 2.25 0 002.244 2.077h8.925a2.25 2.25 0 002.244-2.077L19.508 5.79m-14.65 0a48.108 48.108 0 01-1.023-.167M12 7.5h.008v.008H12V7.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </motion.button>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-semibold text-primary-dark mb-4">Ringkasan Pesanan</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-text-dark">Total Item:</span>
              <span className="font-semibold text-primary-dark">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold text-primary-dark mb-6">
              <span>Total:</span>
              <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCheckout}
              className="w-full bg-accent-gold text-primary-dark font-semibold py-3 rounded-full shadow-lg hover:bg-accent-gold/90 transition-colors duration-200"
            >
              Lanjutkan ke Checkout
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CartPage;
