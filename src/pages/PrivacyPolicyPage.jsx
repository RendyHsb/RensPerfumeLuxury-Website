import React from 'react';
import { motion } from 'motion/react';

const PrivacyPolicyPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary-light text-text-dark py-8 px-4"
    >
      <div className="container mx-auto max-w-4xl bg-secondary-dark p-6 sm:p-8 rounded-lg shadow-xl border border-border-dark">
        <h2 className="text-4xl sm:text-5xl font-playfair text-accent-gold text-center mb-6 sm:mb-8 relative">
          Kebijakan Privasi
          <span className="block w-20 sm:w-24 h-1 bg-accent-gold mx-auto mt-2 sm:mt-4 rounded-full"></span>
        </h2>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-primary-light">
          Di RensPerfumeLuxury, privasi pengunjung dan pelanggan kami adalah prioritas utama. Kebijakan Privasi ini menjelaskan jenis informasi yang dikumpulkan dan dicatat oleh RensPerfumeLuxury dan bagaimana kami menggunakannya.
        </p>

        <h3 className="font-playfair text-2xl sm:text-3xl text-accent-gold mb-3 sm:mb-4">Informasi yang Kami Kumpulkan</h3>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 text-primary-light">
          Kami mengumpulkan informasi pribadi yang Anda berikan secara sukarela kepada kami saat Anda mendaftar di situs kami, melakukan pemesanan, berlangganan newsletter, menanggapi survei, atau mengisi formulir. Informasi ini dapat mencakup nama, alamat email, alamat pengiriman, nomor telepon, dan informasi pembayaran.
        </p>

        <h3 className="font-playfair text-2xl sm:text-3xl text-accent-gold mb-3 sm:mb-4">Bagaimana Kami Menggunakan Informasi Anda</h3>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 text-primary-light">
          Informasi yang kami kumpulkan dapat digunakan untuk:
        </p>
        <ul className="list-disc list-inside font-inter text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 space-y-1 sm:space-y-2 text-primary-light">
          <li>Memproses transaksi Anda dengan cepat.</li>
          <li>Mengirim email berkala mengenai pesanan Anda atau produk dan layanan lainnya.</li>
          <li>Meningkatkan pengalaman Anda di situs kami.</li>
          <li>Mengelola kontes, promosi, survei, atau fitur situs lainnya.</li>
        </ul>

        <h3 className="font-playfair text-2xl sm:text-3xl text-accent-gold mb-3 sm:mb-4">Perlindungan Informasi Anda</h3>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 text-primary-light">
          Kami menerapkan berbagai langkah keamanan untuk menjaga keamanan informasi pribadi Anda saat Anda melakukan pemesanan atau memasukkan, mengirimkan, atau mengakses informasi pribadi Anda.
        </p>

        <h3 className="font-playfair text-2xl sm:text-3xl text-accent-gold mb-3 sm:mb-4">Pengungkapan kepada Pihak Ketiga</h3>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 text-primary-light">
          Kami tidak menjual, memperdagangkan, atau mentransfer informasi pribadi Anda kepada pihak luar. Ini tidak termasuk pihak ketiga tepercaya yang membantu kami dalam mengoperasikan situs web kami, menjalankan bisnis kami, atau melayani Anda, selama pihak-pihak tersebut setuju untuk menjaga kerahasiaan informasi ini.
        </p>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 text-primary-light">
          Dengan menggunakan situs kami, Anda menyetujui kebijakan privasi kami.
        </p>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicyPage;
