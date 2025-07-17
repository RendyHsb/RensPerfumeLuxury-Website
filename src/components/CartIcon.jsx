import React from 'react';
import { motion } from 'motion/react';

const CartIcon = ({ itemCount, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative p-2 rounded-full text-primary-light hover:text-accent-gold transition-colors duration-200"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h11.25a.75.75 0 000-1.5H9.02A2.25 2.25 0 0111.27 15h4.368c.413 0 .75.336.75.75s-.337.75-.75.75H6.75a.75.75 0 00-.75.75c0 1.102.898 2 2 2h4.992l-.001.002a.75.75 0 00.75.75h2.25a.75.75 0 00.75-.75L19.5 5.25a.75.75 0 00-.75-.75H6.168l-.504-1.897a1.5 1.5 0 00-1.404-1.05H2.25z" />
      </svg>

      {itemCount > 0 && (
        <motion.span
          key={itemCount}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute -top-2 -right-2 bg-accent-red text-primary-light text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
        >
          {itemCount}
        </motion.span>
      )}
    </motion.button>
  );
};

export default CartIcon;
