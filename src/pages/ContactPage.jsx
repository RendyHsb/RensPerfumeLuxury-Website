import React, { useState } from 'react';
import { motion } from 'motion/react';

const ContactPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    setTimeout(() => {
      console.log('Form data submitted:', formData);
      setIsSubmitting(false);
      setSubmitMessage('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary-light text-text-dark py-8 px-4"
    >
      <div className="container mx-auto max-w-3xl bg-secondary-dark p-6 sm:p-8 rounded-lg shadow-xl border border-border-dark">
        <h2 className="text-4xl sm:text-5xl font-playfair text-accent-gold text-center mb-6 sm:mb-8 relative">
          Hubungi Kami
          <span className="block w-20 sm:w-24 h-1 bg-accent-gold mx-auto mt-2 sm:mt-4 rounded-full"></span>
        </h2>
        <p className="font-inter text-base sm:text-lg leading-relaxed mb-6 text-center text-text-muted">
          Kami siap membantu Anda. Silakan hubungi kami melalui formulir di bawah ini atau melalui detail kontak kami.
        </p>

        <div className="mb-6 sm:mb-8 text-center">
          <p className="font-inter text-base sm:text-lg text-primary-light">Email: <a href="mailto:info@rensperfumeluxury.com" className="text-accent-gold hover:underline">info@rensperfumeluxury.com</a></p>
          <p className="font-inter text-base sm:text-lg text-primary-light">Telepon: <a href="tel:+6281234567890" className="text-accent-gold hover:underline">+62 858 3752 8531</a></p>
          <p className="font-inter text-base sm:text-lg text-primary-light">Alamat: Jl. Kemewahan No. 10, Jakarta, Indonesia.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="name" className="block text-primary-light text-sm font-inter mb-2">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 rounded-md bg-primary-dark border border-border-dark focus:outline-none focus:ring-2 focus:ring-accent-gold font-inter text-primary-light text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-primary-light text-sm font-inter mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 rounded-md bg-primary-dark border border-border-dark focus:outline-none focus:ring-2 focus:ring-accent-gold font-inter text-primary-light text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-primary-light text-sm font-inter mb-2">Pesan Anda</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full p-2 sm:p-3 rounded-md bg-primary-dark border border-border-dark focus:outline-none focus:ring-2 focus:ring-accent-gold font-inter text-primary-light resize-y text-sm sm:text-base"
              required
            ></textarea>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-accent-gold text-primary-dark font-playfair font-semibold py-2 sm:py-3 rounded-md shadow-lg hover:bg-accent-gold/90 transition-all duration-300 flex items-center justify-center relative text-base sm:text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-t-2 border-t-primary-dark border-accent-gold rounded-full"
              ></motion.div>
            ) : (
              <span>Kirim Pesan</span>
            )}
          </motion.button>
          {submitMessage && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-accent-gold mt-4 font-inter text-sm sm:text-base"
            >
              {submitMessage}
            </motion.p>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default ContactPage;
