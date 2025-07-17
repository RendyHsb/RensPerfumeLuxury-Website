import React from 'react';
import { motion } from 'motion/react';

const OrderHistoryPage = ({ orderHistory, onNavigate }) => {
  const formatRupiah = (amount) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary-light text-text-dark py-12 px-4 sm:px-6 lg:px-8"
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-border-light">
                  <div>
                    <h3 className="font-playfair text-xl sm:text-2xl font-semibold text-text-dark">Pesanan ID: {order.id.substring(0, 8)}...</h3>
                    <p className="text-text-muted text-sm">Tanggal: {formatDate(order.timestamp)}</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <p className="font-bold text-lg sm:text-xl text-accent-gold">Total: {formatRupiah(order.totalAmount)}</p>
                    <span className={`text-sm font-semibold px-2 py-1 rounded-full ${order.status === 'pending' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-4 bg-secondary-dark p-3 rounded-md">
                        <img
                          src={item.images && item.images[0] ? item.images[0] : 'https://placehold.co/60x60/333333/FFFFFF?text=No+Image'}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-grow">
                          <p className="font-semibold text-primary-light">{item.name}</p>
                          <p className="text-text-muted text-sm">{formatRupiah(item.price)} x {item.quantity}</p>
                        </div>
                        <p className="font-bold text-primary-light">{formatRupiah(item.price * item.quantity)}</p>
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
