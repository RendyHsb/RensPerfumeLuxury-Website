import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const ProductForm = ({ initialData = {}, onSubmit, isLoading, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    price: initialData.price || '',
    description: initialData.description || '',
    rating: initialData.rating || 1,
    images: initialData.images && initialData.images.length > 0 ? initialData.images[0] : '',
    category: Array.isArray(initialData.category) ? initialData.category.join(', ') : '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode && initialData.id) {
      setFormData({
        name: initialData.name || '',
        price: initialData.price || '',
        description: initialData.description || '',
        rating: initialData.rating || 1,
        images: initialData.images && initialData.images.length > 0 ? initialData.images[0] : '',
        category: Array.isArray(initialData.category) ? initialData.category.join(', ') : '',
      });
    }
  }, [initialData, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'price') {
      newValue = value.replace(/[^0-9]/g, '');
      if (newValue !== '') {
        newValue = parseInt(newValue, 10);
      } else {
        newValue = '';
      }
    }

    if (name === 'rating') {
      newValue = Math.max(1, Math.min(5, parseInt(value, 10) || 1));
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama parfum tidak boleh kosong.';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Harga harus lebih dari 0.';
    if (!formData.description.trim()) newErrors.description = 'Deskripsi tidak boleh kosong.';
    if (!formData.images.trim()) newErrors.images = 'URL gambar tidak boleh kosong.';
    if (!formData.category.trim()) newErrors.category = 'Kategori tidak boleh kosong.'; 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const categoriesArray = formData.category
        .split(',')
        .map(cat => cat.trim().toLowerCase())
        .filter(cat => cat.length > 0); 

      onSubmit({
        ...initialData, 
        ...formData,
        price: parseInt(formData.price, 10),
        rating: parseInt(formData.rating, 10),
        images: [formData.images], 
        category: categoriesArray, 
      });
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="bg-secondary-dark p-6 sm:p-8 rounded-lg shadow-xl max-w-xl mx-auto my-8 sm:my-12 border border-border-dark"
    >
      <h2 className="text-2xl sm:text-3xl font-playfair text-accent-gold mb-6 sm:mb-8 text-center">
        {isEditMode ? 'Edit Produk Parfum' : 'Tambah Produk Parfum Baru'}
      </h2>

      {/* Nama Parfum */}
      <div className="mb-4 sm:mb-6">
        <label htmlFor="name" className="block text-primary-light text-sm font-inter mb-2">Nama Parfum</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 sm:p-3 rounded-md bg-primary-dark border ${errors.name ? 'border-accent-red' : 'border-border-dark'} focus:outline-none focus:ring-2 focus:ring-accent-gold font-playfair text-primary-light text-sm sm:text-base placeholder-primary-light`}
          placeholder="Contoh: Eternal Bloom"
        />
        {errors.name && <p className="text-accent-red text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Harga (IDR) */}
      <div className="mb-4 sm:mb-6">
        <label htmlFor="price" className="block text-primary-light text-sm font-inter mb-2">Harga (IDR)</label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price === '' ? '' : formatRupiah(formData.price).replace('Rp', '').trim()}
          onChange={handleChange}
          className={`w-full p-2 sm:p-3 rounded-md bg-primary-dark border ${errors.price ? 'border-accent-red' : 'border-border-dark'} focus:outline-none focus:ring-2 focus:ring-accent-gold font-inter text-primary-light text-sm sm:text-base placeholder-primary-light`}
          placeholder="Contoh: 350000"
        />
        {errors.price && <p className="text-accent-red text-xs mt-1">{errors.price}</p>}
      </div>

      {/* Deskripsi */}
      <div className="mb-4 sm:mb-6">
        <label htmlFor="description" className="block text-primary-light text-sm font-inter mb-2">Deskripsi</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className={`w-full p-2 sm:p-3 rounded-md bg-primary-dark border ${errors.description ? 'border-accent-red' : 'border-border-dark'} focus:outline-none focus:ring-2 focus:ring-accent-gold font-inter text-primary-light resize-y text-sm sm:text-base placeholder-primary-light`}
          placeholder="Jelaskan aroma, inspirasi, dan karakteristik parfum ini..."
        ></textarea>
        {errors.description && <p className="text-accent-red text-xs mt-1">{errors.description}</p>}
      </div>

      {/* Rating (1-5 Bintang) */}
      <div className="mb-4 sm:mb-6">
        <label htmlFor="rating" className="block text-primary-light text-sm font-inter mb-2">Rating (1-5 Bintang)</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="1"
          max="5"
          className={`w-full p-2 sm:p-3 rounded-md bg-primary-dark border ${errors.rating ? 'border-accent-red' : 'border-border-dark'} focus:outline-none focus:ring-2 focus:ring-accent-gold font-inter text-primary-light text-sm sm:text-base placeholder-primary-light`}
        />
        {errors.rating && <p className="text-accent-red text-xs mt-1">{errors.rating}</p>}
      </div>

      {/* URL Gambar Parfum */}
      <div className="mb-6 sm:mb-8">
        <label htmlFor="images" className="block text-primary-light text-sm font-inter mb-2">URL Gambar Parfum</label>
        <input
          type="text"
          id="images"
          name="images"
          value={formData.images}
          onChange={handleChange}
          className={`w-full p-2 sm:p-3 rounded-md bg-primary-dark border ${errors.images ? 'border-accent-red' : 'border-border-dark'} focus:outline-none focus:ring-2 focus:ring-accent-gold font-inter text-primary-light text-sm sm:text-base placeholder-primary-light`}
          placeholder="Contoh: https://example.com/parfum.jpg"
        />
        {errors.images && <p className="text-accent-red text-xs mt-1">{errors.images}</p>}
      </div>

      {/* Kategori (Input Baru) */}
      <div className="mb-6 sm:mb-8">
        <label htmlFor="category" className="block text-primary-light text-sm font-inter mb-2">Kategori (Pisahkan dengan koma)</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full p-2 sm:p-3 rounded-md bg-primary-dark border ${errors.category ? 'border-accent-red' : 'border-border-dark'} focus:outline-none focus:ring-2 focus:ring-accent-gold font-inter text-primary-light text-sm sm:text-base placeholder-primary-light`}
          placeholder="Contoh: eksklusif, terbaru, bestseller"
        />
        {errors.category && <p className="text-accent-red text-xs mt-1">{errors.category}</p>}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        className="w-full bg-accent-gold text-primary-dark font-playfair font-semibold py-2 sm:py-3 rounded-md shadow-lg hover:bg-accent-gold/90 transition-all duration-300 flex items-center justify-center relative text-base sm:text-lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-t-2 border-t-primary-dark border-accent-gold rounded-full"
          ></motion.div>
        ) : (
          <span>{isEditMode ? 'Simpan Perubahan' : 'Tambah Produk'}</span>
        )}
      </motion.button>
    </motion.form>
  );
};

export default ProductForm;
