import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ToastNotification = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose();
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  let bgColor = 'bg-blue-500'; // Info
  let icon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mr-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 01.65-.047l1.391.202.164.023a.75.75 0 01.152.198.75.75 0 01.034.257l.006.052V19.5a.75.75 0 01-1.5 0v-2.75l-.224-.031a.75.75 0 01-.291-.156L11.25 11.25z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5a3 3 0 116 0 3 3 0 01-6 0z" />
    </svg>
  );

  if (type === 'success') {
    bgColor = 'bg-green-500';
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  } else if (type === 'error') {
    bgColor = 'bg-red-500';
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }} // Mulai dari bawah dan tengah
          animate={{ opacity: 1, y: 0, x: "-50%" }} // Geser ke atas dan tetap di tengah
          exit={{ opacity: 0, y: 50, x: "-50%" }} // Geser ke bawah saat hilang
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          // Posisi tetap di bawah tengah layar, responsif untuk mobile
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-center z-50
            max-w-[90vw] sm:max-w-md text-center break-words`} // Menyesuaikan lebar dan memastikan teks tidak terpotong
        >
          {icon}
          <span className="font-semibold text-sm sm:text-base">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;
