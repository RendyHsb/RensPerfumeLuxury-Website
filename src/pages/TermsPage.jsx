import React from 'react';
import { motion } from 'motion/react';

const TermsPage = () => {
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
          Syarat & Ketentuan
          <span className="block w-20 sm:w-24 h-1 bg-accent-gold mx-auto mt-2 sm:mt-4 rounded-full"></span>
        </h2>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-primary-light">
          Selamat datang di RensPerfumeLuxury. Dengan mengakses atau menggunakan situs web kami, Anda setuju untuk terikat oleh Syarat & Ketentuan ini. Harap baca dengan cermat sebelum melanjutkan.
        </p>

        <h3 className="font-playfair text-2xl sm:text-3xl text-accent-gold mb-3 sm:mb-4">1. Penggunaan Situs Web</h3>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 text-primary-light">
          Situs web ini disediakan untuk penggunaan pribadi dan non-komersial Anda. Anda tidak boleh menggunakan situs ini untuk tujuan ilegal atau tidak sah.
        </p>

        <h3 className="font-playfair text-2xl sm:text-3xl text-accent-gold mb-3 sm:mb-4">2. Akun Pengguna</h3>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 text-primary-light">
          Jika Anda membuat akun di situs kami, Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun Anda dan untuk semua aktivitas yang terjadi di bawah akun Anda.
        </p>

        <h3 className="font-playfair text-2xl sm:text-3xl text-accent-gold mb-3 sm:mb-4">3. Produk dan Harga</h3>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 text-primary-light">
          Kami berusaha untuk memastikan bahwa semua detail, deskripsi, dan harga produk yang muncul di situs ini akurat. Namun, kesalahan dapat terjadi. Jika kami menemukan kesalahan dalam harga barang yang telah Anda pesan, kami akan memberitahu Anda sesegera mungkin.
        </p>

        <h3 className="font-playfair text-2xl sm:text-3xl text-accent-gold mb-3 sm:mb-4">4. Pembayaran</h3>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 text-primary-light">
          Semua pembayaran harus dilakukan melalui metode pembayaran yang kami sediakan. Pesanan Anda tidak akan diproses sampai pembayaran penuh diterima.
        </p>

        <h3 className="font-playfair text-2xl sm:text-3xl text-accent-gold mb-3 sm:mb-4">5. Pengiriman</h3>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 text-primary-light">
          Kami akan berusaha mengirimkan barang dalam jangka waktu yang wajar. Namun, kami tidak bertanggung jawab atas keterlambatan pengiriman yang disebabkan oleh keadaan di luar kendali kami.
        </p>

        <h3 className="font-playfair text-2xl sm:text-3xl text-accent-gold mb-3 sm:mb-4">6. Hak Kekayaan Intelektual</h3>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 text-primary-light">
          Semua konten di situs ini, termasuk teks, grafik, logo, ikon, gambar, dan perangkat lunak, adalah milik RensPerfumeLuxury atau pemasok kontennya dan dilindungi oleh undang-undang hak cipta.
        </p>

        <h3 className="font-playfair text-2xl sm:text-3xl text-accent-gold mb-3 sm:mb-4">7. Perubahan Syarat & Ketentuan</h3>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-4 text-primary-light">
          Kami berhak untuk mengubah Syarat & Ketentuan ini kapan saja. Perubahan akan berlaku segera setelah diposting di situs web.
        </p>
      </div>
    </motion.div>
  );
};

export default TermsPage;
