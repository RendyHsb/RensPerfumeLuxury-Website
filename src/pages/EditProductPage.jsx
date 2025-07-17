import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import ProductForm from '../components/ProductForm';

const EditProductPage = ({ productToEdit, onUpdateProduct, onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!productToEdit) {
      onNavigate('home', 'Produk tidak ditemukan untuk diedit.', 'error');
    }
  }, [productToEdit, onNavigate]);

  const handleSubmit = (updatedProduct) => {
    setIsLoading(true);
    setTimeout(() => {
      onUpdateProduct(updatedProduct);
      setIsLoading(false);
      onNavigate('home', 'Produk berhasil diperbarui!', 'success');
    }, 1500);
  };

  if (!productToEdit) {
    return null; 
  }

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
          Edit Produk Parfum
          <span className="block w-16 h-1 bg-accent-gold mx-auto mt-2 rounded-full"></span>
        </h2>
        <ProductForm
          initialData={productToEdit}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isEditMode={true}
        />
      </div>
    </motion.div>
  );
};

export default EditProductPage;
