import React, { useState } from 'react'; 
import { motion } from 'motion/react';
import ProductForm from '../components/ProductForm';

const AddProductPage = ({ onAddProduct, onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (newProduct) => {
    setIsLoading(true);
    setTimeout(() => {
      onAddProduct(newProduct);
      setIsLoading(false);
      onNavigate('home', 'Produk berhasil ditambahkan!', 'success');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary-light text-text-dark py-12 px-4 flex items-center justify-center"
    >
      <div className="container mx-auto max-w-xl bg-secondary-dark p-8 rounded-lg shadow-xl border border-border-dark"> {/* New container */}
        <h2 className="text-4xl font-playfair text-accent-gold text-center mb-8 relative">
          Tambah Produk Parfum Baru
          <span className="block w-16 h-1 bg-accent-gold mx-auto mt-2 rounded-full"></span>
        </h2>
        <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </motion.div>
  );
};

export default AddProductPage;
