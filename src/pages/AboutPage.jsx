import React from 'react';
import { motion } from 'motion/react';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-28 sm:pt-32"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair text-primary-dark mb-6 text-center">
        Tentang RensPerfumeLuxury
      </h1>
      <p className="text-lg text-text-dark mb-8 text-center max-w-3xl mx-auto">
        Selamat datang di RensPerfumeLuxury, destinasi utama Anda untuk parfum high-end yang memukau dan tak terlupakan.
        Kami percaya bahwa setiap aroma adalah sebuah cerita, sebuah ekspresi pribadi, dan sebuah karya seni. Oleh karena itu, kami mendedikasikan diri untuk menghadirkan koleksi parfum pilihan dari merek-merek paling eksklusif di dunia.
      </p>
      {}
      {}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center md:text-left max-w-3xl mx-auto" 
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-primary-dark mb-4">Filosofi Kami</h2>
        <p className="text-text-dark mb-4">
          Di RensPerfumeLuxury, kami tidak hanya menjual parfum; kami menawarkan pengalaman. Setiap botol yang kami kurasi adalah perwujudan dari keanggunan, kualitas, dan keunikan. Kami berkomitmen untuk menyediakan produk otentik dan layanan pelanggan yang tak tertandingi, memastikan setiap interaksi Anda dengan kami seindah aroma yang Anda pilih.
        </p>
        <p className="text-text-dark">
          Kami percaya bahwa parfum adalah bentuk seni yang paling intim, sebuah sentuhan akhir yang melengkapi kepribadian Anda. Biarkan kami membantu Anda menemukan aroma khas yang akan meninggalkan kesan abadi.
        </p>
      </motion.div>

      {}
      {/* <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="order-1 md:order-2 flex justify-center"
      >
        <img
          src="https://placehold.co/500x350/E0BBE4/FFFFFF?text=Luxury+Perfume"
          alt="Luxury Perfume Bottle"
          className="rounded-lg shadow-xl max-w-full h-auto"
        />
      </motion.div> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-primary-dark mb-4">Visi Kami</h2>
        <p className="text-text-dark max-w-2xl mx-auto">
          Menjadi destinasi terdepan untuk parfum mewah, menyediakan koleksi yang tak tertandingi dan pengalaman berbelanja yang personal bagi para pecinta aroma di seluruh dunia.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;
