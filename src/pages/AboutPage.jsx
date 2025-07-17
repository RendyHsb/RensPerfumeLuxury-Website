import React from 'react';
import { motion } from 'motion/react';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary-light text-text-dark py-8 px-4"
    >
      <div className="container mx-auto max-w-3xl bg-secondary-dark p-6 sm:p-8 rounded-lg shadow-xl border border-border-dark">
        <h2 className="text-4xl sm:text-5xl font-playfair text-accent-gold text-center mb-6 sm:mb-8 relative">
          Tentang RensPerfumeLuxury
          <span className="block w-20 sm:w-24 h-1 bg-accent-gold mx-auto mt-2 sm:mt-4 rounded-full"></span>
        </h2>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-primary-light">
          Selamat datang di RensPerfumeLuxury, destinasi utama Anda untuk parfum high-end yang memukau dan tak terlupakan. Kami percaya bahwa setiap aroma adalah sebuah cerita, sebuah ekspresi pribadi, dan sebuah karya seni. Oleh karena itu, kami mendedikasikan diri untuk menghadirkan koleksi parfum pilihan dari merek-merek paling eksklusif di dunia.
        </p>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-primary-light">
          Didirikan dengan hasrat untuk keharuman yang luar biasa dan komitmen terhadap kualitas tanpa kompromi, RensPerfumeLuxury adalah perwujudan dari kemewahan dan keanggunan. Setiap botol yang kami tawarkan telah melalui kurasi ketat untuk memastikan Anda mendapatkan pengalaman olfaktori yang tiada duanya.
        </p>
        <p className="font-inter text-base sm:text-lg leading-relaxed text-primary-light">
          Misi kami adalah membantu Anda menemukan aroma khas yang paling sesuai dengan kepribadian dan gaya hidup Anda, meningkatkan setiap momen dengan sentuhan kemewahan. Jelajahi koleksi kami dan biarkan kami membimbing Anda dalam perjalanan menuju keharuman yang sempurna.
        </p>
      </div>
    </motion.div>
  );
};

export default AboutPage;
