import React, { useState } from 'react';
import defaultImage from '@/assets/images/user.jpg';
import SlightFlip from '@/components/magicui/flip-text';
import TextInput from '@/components/Inputs/TextInput';
import { useProfile } from '@/storys/loginValue';

const Profile = () => {
  const { firstName, lastName, phoneNumber, setFirstName, setLastName, setPhoneNumber } = useProfile();
  const [userData, setUserData] = useState({
    firstName: 'Admin',
    lastName: 'Admin',
    phone: '+998 90 123 45 67',
    profileImage: '', // Rasm uchun joy
  });
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Rasm yuklash
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserData((prevData) => ({
        ...prevData,
        profileImage: URL.createObjectURL(file), // Rasmni ko'rsatish uchun URL
      }));
      setImagePreview(URL.createObjectURL(file)); // Preview uchun
    }
  };

  // Tahrirlashni yoqish
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Ma'lumotlarni saqlash
  const handleSave = () => {
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setPhoneNumber(userData.phone);
    
    // Saqlash logikasini qo'shish (API qo'ng'iroqlar uchun)
    console.log('Foydalanuvchi ma\'lumotlari saqlandi:', userData);
    setIsEditing(false);
  };

  // Input maydonlaridagi o'zgarishlarni boshqarish
  const handleChange = (name: string, value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SlightFlip word='Profile' className="text-2xl font-semibold mb-6" />
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <div className="flex flex-col items-center mb-6">
          {/* Profil rasmi */}
          <div className="relative w-32 h-32 mb-4">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 border-[5px] border-[#16423C] rounded-full flex items-center justify-center">
                <img src={defaultImage} alt="default image" className='rounded-full' />
              </div>
            )}

            {/* Rasm yuklash tugmasi */}
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 16l7-7 7 7"
                  />
                </svg>
              </label>
            )}
          </div>

          <h3 className="text-xl font-semibold">{userData.firstName} {userData.lastName}</h3>
        </div>

        {/* Profil ma'lumotlari */}
        <div className="grid grid-cols-2 gap-6">
          {/* Ism */}
          <div>
            <label className="text-2xl font-semibold mb-6">First Name</label>
            {isEditing ? (
              <TextInput
                value={userData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ) : (
              <p className="mt-1">{userData.firstName}</p>
            )}
          </div>

          {/* Familiya */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            {isEditing ? (
              <TextInput
                value={userData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ) : (
              <p className="mt-1">{userData.lastName}</p>
            )}
          </div>

          {/* Telefon raqami */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            {isEditing ? (
              <TextInput
                value={userData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ) : (
              <p className="mt-1">{userData.phone}</p>
            )}
          </div>
        </div>

        {/* Tahrirlash va saqlash tugmalari */}
        <div className="mt-6 text-center">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={toggleEdit}
              className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md shadow hover:bg-gray-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
