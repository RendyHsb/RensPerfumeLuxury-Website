import React from 'react';
import { motion } from 'motion/react';

const Footer = ({ onNavigate }) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-primary-dark text-primary-light py-8 px-4 sm:px-6 lg:px-8 mt-auto"
    >
      <div className="container mx-auto flex flex-col items-center text-center">
        {/* Pastikan div ini juga memiliki text-center untuk teks di dalamnya */}
        <div className="mb-4 sm:mb-0 text-center">
          <h3 className="text-2xl font-playfair text-accent-gold mb-2">RensPerfumeLuxury</h3>
          <p className="text-sm text-text-muted">&copy; 2025-2030 Semua Hak Dilindungi.</p>
        </div>

        {/* Pastikan div ini memiliki justify-center agar tombol-tombolnya di tengah, baik dalam flex-col maupun flex-row */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm mt-4 sm:mt-0 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('privacy')}
            className="text-primary-light hover:text-accent-gold transition-colors duration-200"
          >
            Kebijakan Privasi
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('terms')}
            className="text-primary-light hover:text-accent-gold transition-colors duration-200"
          >
            Syarat & Ketentuan
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('contact')}
            className="text-primary-light hover:text-accent-gold transition-colors duration-200"
          >
            Hubungi Kami
          </motion.button>
        </div>
      </div>
      {/* Div ini sudah memiliki text-center, jadi tidak perlu diubah */}
      <div className="mt-6 text-center text-xs text-text-muted">
        📌Develop by RendyHsb.
      </div>
    </motion.footer>
  );
};

export default Footer;
