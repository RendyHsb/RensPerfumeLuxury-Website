import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';

const HomePage = ({ products, onAddToCart, onDeleteProduct, onEditProduct, currentUser, onNavigate, selectedCategory }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [currentMinPrice, setCurrentMinPrice] = useState(0);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(500000);
  const [sortOrder, setSortOrder] = useState('popular');
  const [viewCount, setViewCount] = useState(30);

  const ADMIN_UID = "aOP1J7oYkVdZNEoe9pbK8ZXfP0J3";
  const isAdmin = currentUser && currentUser.uid === ADMIN_UID;

  useEffect(() => {
    setIsLoading(products.length === 0);

    let filteredProducts = products.filter(product => {
      const productCategories = Array.isArray(product.category) ? product.category : [];
      const lowerCaseSelectedCategory = selectedCategory.toLowerCase();

      const matchesCategory = lowerCaseSelectedCategory === 'all' ||
                              productCategories.includes(lowerCaseSelectedCategory);
      const matchesPrice = product.price >= currentMinPrice && product.price <= currentMaxPrice;

      return matchesCategory && matchesPrice;
    });

    if (sortOrder === 'price-asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setDisplayedProducts(filteredProducts);
    setIsLoading(false);
  }, [products, currentMinPrice, currentMaxPrice, sortOrder, selectedCategory]);

  const handleClearFilters = () => {
    setCurrentMinPrice(minPrice);
    setCurrentMaxPrice(maxPrice);
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const slogan = "Setiap tetes, sebuah cerita kemewahan.";
  const words = slogan.split(" ");

  const getCategoryDisplayName = (category) => {
    switch (category) {
      case 'eksklusif': return 'Koleksi Eksklusif';
      case 'terbaru': return 'Aroma Terbaru';
      case 'bestseller': return 'Best Seller';
      case 'terbatas': return 'Edisi Terbatas';
      default: return 'Semua Produk';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-primary-light text-text-dark min-h-screen flex flex-col lg:flex-row"
    >
      <div className="w-full lg:w-1/4 bg-primary-light p-4 sm:p-6 border border-border-light rounded-lg shadow-sm
                      lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:overflow-y-auto lg:py-8 lg:px-4 lg:z-20">
        <motion.img
          src="/LogoRpl.png"
          alt="RensPerfumeLuxury Logo"
          className="w-full h-auto max-w-[120px] sm:max-w-[200px] mx-auto mb-6 sm:mb-8 rounded-lg pt-20" // pt-20 tetap
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <ul className="space-y-2 text-text-dark text-sm mb-6 sm:mb-8">
          <li>Temukan Aroma Khas Anda</li>
          <li>Eksplorasi Koleksi Terbaik</li>
          <li>Hadiah Istimewa</li>
        </ul>

        {isAdmin && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('add')}
            className="w-full py-2 bg-accent-gold text-primary-dark font-semibold rounded-md text-sm hover:bg-accent-gold/90 transition-colors duration-200 mb-4"
          >
            Tambah Produk Baru
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClearFilters}
          className="w-full py-2 border border-text-dark text-text-dark font-semibold rounded-md text-sm hover:bg-border-light transition-colors duration-200 mb-6 sm:mb-8"
        >
          CLEAR ALL FILTERS
        </motion.button>

        <h4 className="font-playfair text-base sm:text-lg font-semibold mb-4 text-text-dark">HARGA</h4>
        <div className="flex items-center justify-between text-xs sm:text-sm mb-4">
          <span className="text-text-dark">{formatRupiah(currentMinPrice)}</span>
          <span className="text-text-dark">{formatRupiah(currentMaxPrice)}</span>
        </div>
        <div className="relative mb-6">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={currentMinPrice}
            onChange={(e) => setCurrentMinPrice(parseInt(e.target.value))}
            className="w-full h-1 bg-border-light rounded-lg appearance-none cursor-pointer accent-accent-red"
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={currentMaxPrice}
            onChange={(e) => setCurrentMaxPrice(parseInt(e.target.value))}
            className="w-full h-1 bg-border-light rounded-lg appearance-none cursor-pointer accent-accent-red mt-2"
          />
          <div className="absolute top-0 left-0 w-full h-1 rounded-lg" style={{
            background: `linear-gradient(to right, ${'#E0E0E0'} ${((currentMinPrice - minPrice) / (maxPrice - minPrice)) * 100}%, ${'#E00000'} ${((currentMinPrice - minPrice) / (maxPrice - minPrice)) * 100}%, ${'#E00000'} ${((currentMaxPrice - minPrice) / (maxPrice - minPrice)) * 100}%, ${'#E0E0E0'} ${((currentMaxPrice - minPrice) / (maxPrice - minPrice)) * 100}%)`
          }}></div>
        </div>
        <p className="text-text-muted text-xs">Persempit pencarian produk Anda dengan filter</p>
      </div>

      <div className="w-full lg:w-3/4 lg:ml-[25%] py-8 px-4">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-playfair text-text-dark mb-4"
        >
          {getCategoryDisplayName(selectedCategory)}
        </motion.h2>

        <motion.p
          className="font-inter text-base sm:text-lg text-text-dark mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.05,
                },
            },
          }}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-1"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-end items-end sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-text-dark">SORT:</span> {/* Teks SORT: hitam */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              // Text terpilih: Background gold, Text hitam
              className="p-2 border border-accent-gold rounded-md bg-accent-gold text-primary-dark font-semibold text-sm shadow-md focus:ring-2 focus:ring-primary-dark focus:border-transparent hover:bg-accent-gold/90 transition-colors duration-200 cursor-pointer"
            >
              {/* Opsi: Background putih, Text hitam */}
              <option value="popular" className="bg-primary-light text-primary-dark">Unggulan</option>
              <option value="price-asc" className="bg-primary-light text-primary-dark">Harga: Rendah ke Tinggi</option>
              <option value="price-desc" className="bg-primary-light text-primary-dark">Harga: Tinggi ke Rendah</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-text-dark">VIEW:</span> {/* Teks VIEW: hitam */}
            <select
              value={viewCount}
              onChange={(e) => setViewCount(parseInt(e.target.value))}
              // Text terpilih: Background gold, Text hitam
              className="p-2 border border-accent-gold rounded-md bg-accent-gold text-primary-dark font-semibold text-sm shadow-md focus:ring-2 focus:ring-primary-dark focus:border-transparent hover:bg-accent-gold/90 transition-colors duration-200 cursor-pointer"
            >
              {/* Opsi: Background putih, Text hitam */}
              <option value="10" className="bg-primary-light text-primary-dark">10</option>
              <option value="20" className="bg-primary-light text-primary-dark">20</option>
              <option value="30" className="bg-primary-light text-primary-dark">30</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {displayedProducts.slice(0, viewCount).length > 0 ? (
              displayedProducts.slice(0, viewCount).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  isAdmin={isAdmin}
                  onDeleteProduct={onDeleteProduct}
                  onEditProduct={onEditProduct}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-text-muted text-xl font-inter">
                Tidak ada produk yang cocok dengan filter Anda.
              </p>
            )}
          </motion.div>
        )}
      </div>
      <motion.button
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 1 }}
        onClick={() => onNavigate('help')}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-text-dark text-primary-light py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg hover:bg-secondary-dark transition-colors duration-200 z-50 text-sm sm:text-base"
      >
        Bantuan
      </motion.button>
    </motion.div>
  );
};

export default HomePage;
