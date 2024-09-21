// components/Tooltip.tsx
import React from 'react';

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    return (
        <div className="relative group z-999999 ">
            {children}
            <div className="absolute bottom-full mb-2 hidden group-hover:block  ease-in-out opacity-0 group-hover:opacity-100 bg-white text-black text-sm rounded py-2 px-4 shadow-lg transform -translate-y-2 transition-transform duration-300 scale-95 group-hover:scale-100">
                {text}
            </div>
        </div>
    );
};

export default Tooltip;
