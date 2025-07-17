import React from 'react';
import { motion } from 'motion/react';

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const CheckoutPage = ({ cartItems, onNavigate }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = 25000; 
  const totalAmount = subtotal + shippingCost;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary-light py-8 px-4 text-text-dark"
    >
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl sm:text-5xl font-playfair text-accent-gold text-center mb-8 sm:mb-12 relative">
          Ringkasan Pesanan
          <span className="block w-20 sm:w-24 h-1 bg-accent-gold mx-auto mt-2 sm:mt-4 rounded-full"></span>
        </h2>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-10 bg-secondary-dark p-6 rounded-lg shadow-md border border-border-dark"
          >
            <p className="text-xl font-inter text-text-muted mb-6">Keranjang Anda kosong. Tidak ada yang bisa dibeli.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('home')}
              className="bg-accent-gold text-primary-dark font-playfair font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-md shadow-lg hover:bg-accent-gold/90 transition-all duration-300 text-base sm:text-lg"
            >
              Kembali ke Beranda
            </motion.button>
          </motion.div>
        ) : (
          <div className="bg-secondary-dark p-6 rounded-lg shadow-md border border-border-dark">
            <h3 className="font-playfair text-2xl text-accent-gold mb-6">Detail Pesanan</h3>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-border-dark pb-2 last:border-b-0">
                  <div className="flex items-center">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md mr-4"
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/333333/FFFFFF?text=No+Image"; }}
                    />
                    <span className="font-inter text-primary-light text-base sm:text-lg">{item.name} (x{item.quantity})</span>
                  </div>
                  <span className="font-inter text-primary-light text-base sm:text-lg">{formatRupiah(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border-dark pt-4 space-y-2">
              <div className="flex justify-between text-primary-light font-inter text-lg">
                <span>Subtotal:</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-primary-light font-inter text-lg">
                <span>Biaya Pengiriman:</span>
                <span>{formatRupiah(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-accent-gold font-playfair text-xl font-bold pt-2">
                <span>Total:</span>
                <span>{formatRupiah(totalAmount)}</span>
              </div>
            </div>

            <h3 className="font-playfair text-2xl text-accent-gold mt-8 mb-4">Metode Pembayaran</h3>
            <div className="bg-primary-dark p-4 rounded-md border border-border-dark text-text-muted text-center text-base sm:text-lg">
              <p>Fitur pembayaran akan diintegrasikan di sini.</p>
              <p>Contoh: Kartu Kredit, Transfer Bank, E-wallet.</p>
              <p className="mt-2 text-accent-gold">Ini adalah placeholder untuk demo.</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                alert('Pembelian Berhasil! Terima kasih telah berbelanja.');
                onNavigate('home', 'Pembelian berhasil!', 'success');
              }}
              className="w-full bg-accent-gold text-primary-dark font-playfair font-semibold py-2 sm:py-3 rounded-md shadow-lg hover:bg-accent-gold/90 transition-all duration-300 mt-8 text-base sm:text-lg"
            >
              Konfirmasi Pembelian
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('cart')}
              className="w-full bg-border-dark text-primary-light font-playfair font-semibold py-2 sm:py-3 rounded-md shadow-lg hover:bg-border-dark/80 transition-all duration-300 mt-4 text-base sm:text-lg"
            >
              Kembali ke Keranjang
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
