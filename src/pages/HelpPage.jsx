import React from 'react';
import { motion } from 'motion/react';

const HelpPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Menambahkan padding-top yang lebih besar untuk mengatasi navbar fixed
      className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-28 sm:pt-32"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair text-primary-dark mb-6 text-center">
        Pusat Bantuan RensPerfumeLuxury
      </h1>
      <p className="text-lg text-text-dark mb-8 text-center max-w-2xl mx-auto">
        Selamat Datang di Pusat Bantuan Kami!
        Kami siap membantu Anda menemukan aroma yang sempurna dan memastikan pengalaman berbelanja Anda berjalan lancar. Di sini Anda akan menemukan jawaban atas pertanyaan umum dan panduan untuk menggunakan situs kami.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pertanyaan Umum (FAQ) */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary-dark mb-4">Pertanyaan Umum (FAQ)</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-primary-dark mb-2">Bagaimana cara mencari parfum?</h3>
              <p className="text-text-dark">Anda dapat menggunakan bilah pencarian di bagian atas halaman atau menelusuri kategori seperti "KOLEKSI EKSKLUSIF", "AROMA TERBARU", "BEST SELLER", dan "EDISI TERBATAS".</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-primary-dark mb-2">Bagaimana cara melakukan pemesanan?</h3>
              <p className="text-text-dark">Pilih parfum yang Anda inginkan, tambahkan ke keranjang, lalu ikuti langkah-langkah checkout untuk menyelesaikan pembelian Anda.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-primary-dark mb-2">Apakah ada opsi pengiriman internasional?</h3>
              <p className="text-text-dark">Saat ini kami hanya melayani pengiriman di wilayah Indonesia. Kami sedang berupaya untuk memperluas jangkauan pengiriman kami di masa mendatang.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-primary-dark mb-2">Bagaimana cara melacak pesanan saya?</h3>
              <p className="text-text-dark">Setelah pesanan Anda dikirim, Anda akan menerima email konfirmasi dengan nomor pelacakan. Anda bisa menggunakan nomor ini di situs web mitra pengiriman kami.</p>
            </div>
          </div>
        </div>

        {/* Panduan Penggunaan Situs */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary-dark mb-4">Panduan Penggunaan Situs</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-primary-dark mb-2">Membuat Akun</h3>
              <p className="text-text-dark">Untuk pengalaman berbelanja yang lebih baik, Anda dapat mendaftar akun. Ini memungkinkan Anda untuk menyimpan daftar keinginan, melihat riwayat pesanan, dan checkout lebih cepat.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-primary-dark mb-2">Mengelola Keranjang Belanja</h3>
              <p className="text-text-dark">Anda dapat menambah atau menghapus item dari keranjang belanja Anda kapan saja. Kuantitas juga dapat disesuaikan langsung di halaman keranjang.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-primary-dark mb-2">Keamanan Pembayaran</h3>
              <p className="text-text-dark">Kami menggunakan sistem pembayaran yang aman untuk melindungi informasi pribadi dan keuangan Anda. Semua transaksi dienkripsi.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HelpPage;
