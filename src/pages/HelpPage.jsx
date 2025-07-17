import React from 'react';
import { motion } from 'motion/react';

const HelpPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary-light text-text-dark py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-3xl bg-secondary-dark p-6 sm:p-8 rounded-lg shadow-xl border border-border-dark">
        <h2 className="text-4xl font-playfair text-accent-gold text-center mb-8 relative">
          Pusat Bantuan RensPerfumeLuxury
          <span className="block w-16 h-1 bg-accent-gold mx-auto mt-2 rounded-full"></span>
        </h2>

        <section className="mb-8">
          <h3 className="text-2xl font-playfair text-primary-light mb-4">Selamat Datang di Pusat Bantuan Kami</h3>
          <p className="text-text-muted leading-relaxed">
            Kami siap membantu Anda menemukan aroma yang sempurna dan memastikan pengalaman berbelanja Anda berjalan lancar.
            Di sini Anda akan menemukan jawaban atas pertanyaan umum dan panduan untuk menggunakan situs kami.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-playfair text-primary-light mb-4">Pertanyaan Umum (FAQ)</h3>
          <ul className="space-y-4 text-text-muted">
            <li>
              <h4 className="font-semibold text-lg text-primary-light mb-1">Bagaimana cara mencari parfum?</h4>
              <p>
                Anda dapat menggunakan bilah pencarian di bagian atas halaman atau menelusuri kategori parfum di bawah Navbar utama (seperti "KOLEKSI EKSKLUSIF", "AROMA TERBARU", dll.) untuk menemukan produk yang sesuai dengan preferensi Anda.
              </p>
            </li>
            <li>
              <h4 className="font-semibold text-lg text-primary-light mb-1">Bagaimana cara menambahkan produk ke keranjang?</h4>
              <p>
                Di setiap halaman detail produk, Anda akan menemukan tombol "Tambahkan ke Keranjang". Klik tombol ini untuk menambahkan parfum pilihan Anda ke keranjang belanja.
              </p>
            </li>
            <li>
              <h4 className="font-semibold text-lg text-primary-light mb-1">Apakah saya perlu membuat akun untuk berbelanja?</h4>
              <p>
                Anda dapat menjelajahi dan menambahkan produk ke keranjang tanpa akun. Namun, untuk menyelesaikan pembelian dan melacak pesanan, Anda perlu masuk atau mendaftar akun.
              </p>
            </li>
            <li>
              <h4 className="font-semibold text-lg text-primary-light mb-1">Bagaimana cara menghubungi layanan pelanggan?</h4>
              <p>
                Anda dapat menghubungi kami melalui halaman "Kontak" yang tersedia di Navbar utama. Kami akan berusaha merespons pertanyaan Anda secepat mungkin.
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-playfair text-primary-light mb-4">Informasi Tambahan</h3>
          <p className="text-text-muted leading-relaxed">
            Jika Anda memiliki pertanyaan lebih lanjut yang tidak terjawab di sini, jangan ragu untuk menghubungi tim dukungan kami.
            Kami berkomitmen untuk memberikan pengalaman terbaik bagi Anda di RensPerfumeLuxury.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default HelpPage;
