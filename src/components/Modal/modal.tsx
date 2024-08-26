import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const AnimatedModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className={`bg-white rounded-lg shadow-lg transform transition-transform duration-500 ${
          isOpen ? 'translate-y-0 scale-100' : '-translate-y-10 scale-95'
        } p-6 w-full max-w-md mx-4 relative`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
        >
          &times;
        </button>

        {/* Modal Header */}
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* Modal Body */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AnimatedModal;
