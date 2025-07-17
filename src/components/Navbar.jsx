import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CartIcon from './CartIcon';

const Navbar = ({ onNavigate, cartItemCount, currentUser, onLogout, selectedCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { name: 'KOLEKSI EKSKLUSIF', value: 'eksklusif' },
    { name: 'AROMA TERBARU', value: 'terbaru' },
    { name: 'BEST SELLER', value: 'bestseller' },
    { name: 'EDISI TERBATAS', value: 'terbatas' },
  ];

  const brandName = "RensPerfumeLuxury";

  const textScrollVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: {
      y: ["100%", "0%", "0%", "-100%"],
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        times: [0, 0.2, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 0.5
      }
    }
  };

  // Varian animasi untuk menu mobile (slide dari kanan)
  const menuVariants = {
    hidden: { opacity: 0, x: "100%" }, // Mulai dari luar layar kanan
    visible: {
      opacity: 1,
      x: "0%", // Geser ke dalam layar
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      x: "100%", // Geser kembali ke luar layar kanan
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  // Varian animasi untuk setiap item di dalam menu mobile
  const menuItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.2 }}
      className="bg-primary-dark text-primary-light shadow-lg fixed top-0 w-full z-40"
    >
      <div className="container mx-auto px-4 py-4 flex flex-row justify-between items-center">
        {/* Brand Name with Scrolling Text Animation */}
        <div
          className="text-base sm:text-3xl md:text-4xl font-playfair text-accent-gold cursor-pointer relative overflow-hidden flex items-center justify-start flex-grow min-w-0"
          style={{ height: '55px' }}
          onClick={() => onNavigate('home', '', 'info', 'all')}
        >
          <motion.span
            className="absolute whitespace-nowrap"
            style={{ transform: 'translateY(-50%)' }}
            variants={textScrollVariants}
            initial="initial"
            animate="animate"
          >
            {brandName}
          </motion.span>
        </div>

        <div className="flex items-center space-x-4">

          {/* Hamburger Icon & Mobile User/Cart (Hanya terlihat di mobile) */}
          <div className="flex sm:hidden items-center space-x-4">
            <CartIcon itemCount={cartItemCount} onClick={() => onNavigate('cart')} />
            {currentUser ? (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-primary-light hover:text-accent-gold transition-colors duration-200 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0v3.75a2.25 2.25 0 01-2.25 2.25H9.75A2.25 2.25 0 017.5 9.75V6z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M3.375 16.5a.75.75 0 000 1.5h17.25a.75.75 0 000-1.5H3.375z" clipRule="evenodd" />
                  </svg>
                  {currentUser.email ? currentUser.email.split('@')[0] : 'Profil'}
                </motion.button>
                <div className="absolute right-0 mt-2 w-48 bg-secondary-dark rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <motion.button
                    whileHover={{ backgroundColor: '#444444' }}
                    className="block w-full text-left px-4 py-2 text-primary-light hover:text-accent-gold"
                    onClick={() => { onNavigate('profile'); setIsMenuOpen(false); }}
                  >
                    Lihat Profil
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: '#444444' }}
                    className="block w-full text-left px-4 py-2 text-primary-light hover:text-accent-gold"
                    onClick={() => { onNavigate('orderHistory'); setIsMenuOpen(false); }}
                  >
                    Riwayat Pesanan
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: '#444444' }}
                    className="block w-full text-left px-4 py-2 text-primary-light hover:text-accent-red"
                    onClick={() => { onLogout(); setIsMenuOpen(false); }}
                  >
                    Keluar
                  </motion.button>
                </div>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => { onNavigate('login'); setIsMenuOpen(false); }}
                className="bg-accent-gold text-primary-dark font-semibold py-1 px-3 rounded-md shadow-md hover:bg-accent-gold/90 transition-colors duration-200"
              >
                Masuk
              </motion.button>
            )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-primary-light focus:outline-none ml-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Desktop Nav Links & Desktop User/Cart (Hanya terlihat di desktop) */}
          <div className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm sm:text-base">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('home', '', 'info', 'all')}
              className="text-primary-light hover:text-accent-gold transition-colors duration-200"
            >
              Beranda
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('about')}
              className="text-primary-light hover:text-accent-gold transition-colors duration-200"
            >
              Tentang Kami
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('contact')}
              className="text-primary-light hover:text-accent-gold transition-colors duration-200"
            >
              Kontak
            </motion.button>
            <CartIcon itemCount={cartItemCount} onClick={() => onNavigate('cart')} />
            {currentUser ? (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-primary-light hover:text-accent-gold transition-colors duration-200 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0v3.75a2.25 2.25 0 01-2.25 2.25H9.75A2.25 2.25 0 017.5 9.75V6z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M3.375 16.5a.75.75 0 000 1.5h17.25a.75.75 0 000-1.5H3.375z" clipRule="evenodd" />
                  </svg>
                  {currentUser.email ? currentUser.email.split('@')[0] : 'Profil'}
                </motion.button>
                <div className="absolute right-0 mt-2 w-48 bg-secondary-dark rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <motion.button
                    whileHover={{ backgroundColor: '#444444' }}
                    className="block w-full text-left px-4 py-2 text-primary-light hover:text-accent-gold"
                    onClick={() => { onNavigate('profile'); }}
                  >
                    Lihat Profil
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: '#444444' }}
                    className="block w-full text-left px-4 py-2 text-primary-light hover:text-accent-gold"
                    onClick={() => { onNavigate('orderHistory'); }}
                  >
                    Riwayat Pesanan
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: '#444444' }}
                    className="block w-full text-left px-4 py-2 text-primary-light hover:text-accent-red"
                    onClick={onLogout}
                  >
                    Keluar
                  </motion.button>
                </div>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigate('login')}
                className="bg-accent-gold text-primary-dark font-semibold py-1 px-3 rounded-md shadow-md hover:bg-accent-gold/90 transition-colors duration-200"
              >
                Masuk
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay background */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)} // Tutup menu saat klik di luar
            />
            {/* Menu konten */}
            <motion.div
              className="fixed top-0 right-0 h-full w-3/4 bg-primary-dark py-8 px-6 shadow-lg flex flex-col items-start space-y-6 sm:hidden z-50"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Tombol Tutup (X) */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(false)}
                className="self-end text-primary-light hover:text-accent-gold focus:outline-none mb-4"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </motion.button>

              <motion.button
                variants={menuItemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { onNavigate('home', '', 'info', 'all'); setIsMenuOpen(false); }}
                className="text-primary-light hover:text-accent-gold transition-colors duration-200 text-lg font-semibold w-full text-left"
              >
                Beranda
              </motion.button>
              <motion.button
                variants={menuItemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { onNavigate('about'); setIsMenuOpen(false); }}
                className="text-primary-light hover:text-accent-gold transition-colors duration-200 text-lg font-semibold w-full text-left"
              >
                Tentang Kami
              </motion.button>
              <motion.button
                variants={menuItemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }}
                className="text-primary-light hover:text-accent-gold transition-colors duration-200 text-lg font-semibold w-full text-left"
              >
                Kontak
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Categories Bar */}
      <div className="w-full bg-primary-light border-t border-border-light py-3 px-4 flex justify-center items-center flex-wrap gap-x-3 gap-y-2 text-xs sm:text-sm md:text-base">
        {categories.map((cat) => (
          <motion.button
            key={cat.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('home', '', 'info', cat.value)}
            className={`
              text-text-dark hover:text-accent-gold transition-colors duration-200 font-semibold
              ${selectedCategory === cat.value ? 'text-accent-gold border-b-2 border-accent-gold pb-1' : ''}
            `}
          >
            {cat.name}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
