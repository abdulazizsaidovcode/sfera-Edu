import React from 'react';

interface NotificationCardProps {
  title: string;
  message: string;
  time: string;
  type: string // Xabarning turi
}

const NotificationCard: React.FC<NotificationCardProps> = ({ title, message, time, type }) => {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'true':
        return 'bg-[#fff] text-black border-[#057313]';
      default:
        return 'bg-green-100 text-green-600 border-green-400';
    }
  };

  return (
    <div className={`border-l-4 p-4 mb-4 rounded-md shadow-lg ${getTypeStyles(type)}`}>
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-lg">{title}</h4>
        <span className="text-sm text-gray-500">{time}</span>
      </div>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default NotificationCard;
