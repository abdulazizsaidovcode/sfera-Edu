import { useState, useEffect, useRef } from 'react';
import userImage from '@/assets/images/user.jpg';
import ShinyButton from '@/components/magicui/shiny-button';
import { IoIosLogOut } from 'react-icons/io';

const DropdownUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dropdownni boshqa joyga bosganda yopish
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Agar bosilgan joy dropdowndan tashqarida bo'lsa, dropdown yopiladi
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    const confirmLogout = window.confirm('Tizimdan chiqmoqchimisiz?');
    if (confirmLogout) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Info Qismi */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)} // Bosganda dropdown ochiladi/yopiladi
      >
        <span className="h-12 w-12 rounded-full bg-slate-600 object-cover overflow-hidden">
          <img
            src={userImage}
            alt="User"
            className="w-full h-full"
          />
        </span>
      </div>
      <div
        className={`absolute right-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
          }`}
      >
        <span className="block px-4 py-2 text-base font-bold text-black">
          Sardorbek Sayfullayev {/* Ism va Familiya */}
        </span>
        <span className="block px-4 py-2 text-sm text-gray-700">
          +998942939449 {/* Telefon Raqami */}
        </span>
        <div className="flex justify-center items-center gap-5 mb-3">
          <ShinyButton
            text='Sign Out'
            onClick={() => {
              handleLogout();
            }}
            icon={<IoIosLogOut size={25} />}
            className='bg-[#063d36] border-none w-48'
          />
        </div>
      </div>
    </div>
  );
};

export default DropdownUser;
