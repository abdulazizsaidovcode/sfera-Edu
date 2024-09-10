import React from 'react';
import { motion } from 'framer-motion';

interface LoadingModalProps {
  isVisible: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center" 
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        zIndex: 1000 // Ensure the modal is above other elements
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="flex items-center justify-center"
      >
        <svg className="w-32 h-32 animate-spin text-[#087E43]" viewBox="0 0 24 24">
          <circle className="opacity-10" cx="12" cy="12"  stroke="currentColor" ></circle>
          <path className="opacity-100" fill="none" stroke="currentColor" strokeWidth="2" d="M4 12a8 8 0 0 1 16 0"></path>
        </svg>
      </motion.div>
    </div>
  );
};

export default LoadingModal;
