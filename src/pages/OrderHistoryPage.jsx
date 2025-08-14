import React from 'react';
import { motion } from 'motion/react';

const OrderHistoryPage = ({ orderHistory, onNavigate }) => {
  const formatRupiah = (amount) => {
    if (amount === null || amount === undefined) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    let date;
    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'object' && timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000);
    } else {
      date = new Date(timestamp);
    }

    if (isNaN(date.getTime())) return 'Tanggal Tidak Valid';

    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  // Logika robust untuk mendapatkan URL gambar, sama seperti di ProductCard
  const getImageUrl = (item) => {
    let imageUrl = 'https://placehold.co/60x60/333333/FFFFFF?text=No+Image'; // Placeholder default
    if (item.images && item.images.length > 0 && item.images[0]) {
      const firstImage = item.images[0];
      if (firstImage.startsWith('http://') || firstImage.startsWith('https://')) {
        imageUrl = firstImage;
      } else {
        imageUrl = `/image/${firstImage.split('/').pop()}`;
      }
    }
    return imageUrl;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      // Tambahkan padding-top untuk Fixed Navbar
      className="pt-28 sm:pt-32 min-h-screen bg-primary-light text-text-dark px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-4xl bg-secondary-dark p-6 sm:p-8 rounded-lg shadow-xl border border-border-dark">
        <h2 className="text-4xl font-playfair text-accent-gold text-center mb-8 relative">
          Riwayat Pesanan Anda
          <span className="block w-16 h-1 bg-accent-gold mx-auto mt-2 rounded-full"></span>
        </h2>

        {orderHistory.length === 0 ? (
          <div className="text-center text-text-muted text-xl py-10">
            <p className="mb-4">Anda belum memiliki riwayat pesanan.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('home')}
              className="bg-accent-gold text-primary-dark font-semibold py-2 px-4 rounded-md shadow-md hover:bg-accent-gold/90 transition-colors duration-200"
            >
              Mulai Berbelanja
            </motion.button>
          </div>
        ) : (
          <div className="space-y-8">
            {orderHistory.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-primary-light p-4 sm:p-6 rounded-lg shadow-md border border-border-light"
              >
                {/* Header Pesanan - Lebih Responsif */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-border-light">
                  <div>
                    <h3 className="font-playfair text-xl sm:text-2xl font-semibold text-text-dark">Pesanan ID: {order.id.substring(0, 8)}...</h3>
                    <p className="text-text-muted text-sm">Tanggal: {formatDate(order.timestamp)}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 text-left sm:text-right">
                    <p className="font-bold text-lg sm:text-xl text-accent-gold whitespace-nowrap">Total: {formatRupiah(order.totalAmount)}</p>
                    <span className={`text-sm font-semibold px-2 py-1 rounded-full ${order.status === 'pending' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2 sm:space-x-4 bg-secondary-dark p-2 sm:p-3 rounded-md">
                        {/* Gambar Produk - Menggunakan logika robust */}
                        <img
                          src={getImageUrl(item)}
                          alt={item.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md flex-shrink-0"
                          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/60x60/333333/FFFFFF?text=No+Image`; }}
                        />
                        <div className="flex-grow">
                          <p className="font-semibold text-primary-light text-sm sm:text-base line-clamp-1">{item.name}</p>
                          <p className="text-text-muted text-xs sm:text-sm">{formatRupiah(item.price)} x {item.quantity}</p>
                        </div>
                        {/* Angka Subtotal - Tambahkan flex-shrink-0 dan whitespace-nowrap */}
                        <p className="font-bold text-primary-light flex-shrink-0 text-sm sm:text-base text-right whitespace-nowrap">{formatRupiah(item.price * item.quantity)}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-text-muted text-center">Tidak ada item dalam pesanan ini.</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OrderHistoryPage;
