// src/components/TaskAccardion.tsx
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface AccordionProps {
    number: number; // Tartib raqami
    firstName: string; // Ism
    lastName: string; // Familiya
    groupName: string; // Guruh nomi
    children: React.ReactNode; // Accordion tarkibi
}

const TaskAccardion: React.FC<AccordionProps> = ({
    number,
    firstName,
    lastName,
    groupName,
    children
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full max-w-full border border-[#316651] rounded-lg shadow-lg mb-6 transition-all duration-500 ease-in-out ">
            <button
                className="w-full flex justify-between items-center px-4 md:px-6 py-4 text-black font-bold text-base md:text-lg rounded-t-lg shadow-lg focus:outline-none"
                onClick={toggleAccordion}
            >
                {/* Flex holatda ism, familiya va guruh nomini chiqarish */}
                <div className="flex items-center">
                    <span className="mr-4 md:mr-6 text-xl md:text-2xl font-extrabold text-black">{number}.</span>
                    <div className="flex flex-col items-start">
                        <span className="text-lg md:text-xl font-semibold tracking-wide text-black">
                            {firstName} {lastName}
                        </span>
                        <span className="text-xs md:text-sm text-gray-400 italic">
                            Guruh: {groupName}
                        </span>
                    </div>
                </div>
                <span className="text-xl md:text-2xl text-black">
                    {isOpen ? <FiChevronUp /> : <FiChevronDown />} {/* Ochilgan yoki yopilgan holat */}
                </span>
            </button>
            <div
                className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
            >
                <div className="p-4 md:p-6 bg-gray-100 rounded-b-lg shadow-inner">
                    {children} {/* Accordionning ichki tarkibi */}
                </div>
            </div>
        </div>
    );
};

export default TaskAccardion;
