import React from 'react';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: number; // raqam qo'shildi
}

const TeacherCard: React.FC<CardProps> = ({ icon, title, description, number }) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-xl p-4 bg-black  hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-start text-blue-500 mb-4  cursor-pointer">
        <div className="text-4xl mr-2">
          {icon}
        </div>
        <div className="font-bold text-xl">
          {title}
        </div>
      </div>

      {/* Raqam */}
      <div className="flex justify-center items-center mb-4">
        <span className="text-5xl text-yellow-400 animate-bounce">{number}</span>
      </div>

      <p className="text-white text-base text-center">
        {description}
      </p>
    </div>
  );
};

export default TeacherCard;
