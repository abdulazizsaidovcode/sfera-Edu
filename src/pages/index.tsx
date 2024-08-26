
import AnimatedModal from '@/components/Modal/modal';
import React, { useState } from 'react'

function Index() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <button
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all"
            >
                Open Animated Modal
            </button>

            <AnimatedModal isOpen={isModalOpen} onClose={closeModal} title="Chiroyli Modal">
                <p className="text-gray-700">
                    Bu yerda siz modalga tegishli kontentni joylashtirishingiz mumkin.
                </p>
                <button
                    onClick={closeModal}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-4"
                >
                    Modalni Yopish
                </button>
            </AnimatedModal>
        </div>
    );
}

export default Index
