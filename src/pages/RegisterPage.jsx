import React, { useState } from 'react';
import { motion } from 'motion/react';

const RegisterPage = ({ onRegister, onNavigate, toast }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast('Kata sandi tidak cocok!', 'error');
      return;
    }
    setIsLoading(true);
    try {
      await onRegister(email, password);
      toast('Pendaftaran berhasil! Silakan masuk.', 'success');
      onNavigate('login');
    } catch (error) {
      console.error('Registration error:', error);
      toast(`Gagal daftar: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary-light text-text-dark py-12 px-4 flex items-center justify-center"
    >
      <div className="container mx-auto max-w-md bg-secondary-dark p-8 rounded-lg shadow-xl border border-border-dark">
        <h2 className="text-4xl font-playfair text-accent-gold text-center mb-8 relative">
          Daftar Akun Baru
          <span className="block w-16 h-1 bg-accent-gold mx-auto mt-2 rounded-full"></span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-primary-light text-sm font-inter mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-primary-dark border border-border-dark focus:outline-none focus:ring-2 focus:ring-accent-gold font-inter text-primary-light"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-primary-light text-sm font-inter mb-2">Kata Sandi</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-primary-dark border border-border-dark focus:outline-none focus:ring-2 focus:ring-accent-gold font-inter text-primary-light"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-primary-light text-sm font-inter mb-2">Konfirmasi Kata Sandi</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-primary-dark border border-border-dark focus:outline-none focus:ring-2 focus:ring-accent-gold font-inter text-primary-light"
              required
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-accent-gold text-primary-dark font-playfair font-semibold py-3 rounded-md shadow-lg hover:bg-accent-gold/90 transition-all duration-300 flex items-center justify-center relative"
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-t-2 border-t-primary-dark border-accent-gold rounded-full"
              ></motion.div>
            ) : (
              <span>Daftar</span>
            )}
          </motion.button>
        </form>
        <p className="text-center text-text-muted mt-6 font-inter text-sm">
          Sudah punya akun?{' '}
          <button onClick={() => onNavigate('login')} className="text-accent-gold hover:underline">
            Masuk di sini
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
