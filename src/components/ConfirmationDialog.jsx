import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ConfirmationDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-luxury-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-luxury-ivory p-8 rounded-lg shadow-2xl max-w-sm w-full text-center border border-luxury-gold"
          >
            <p className="text-luxury-black font-inter text-lg mb-6">{message}</p>
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCancel}
                className="px-6 py-2 bg-luxury-nude text-luxury-black rounded-md font-semibold font-inter shadow-md hover:bg-luxury-nude/80 transition-colors duration-200"
              >
                Batal
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
                className="px-6 py-2 bg-red-600 text-white rounded-md font-semibold font-inter shadow-md hover:bg-red-700 transition-colors duration-200"
              >
                Hapus
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationDialog;
