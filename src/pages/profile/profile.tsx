import PhoneInput from '@/components/Inputs/PhoneInput';
import TextInput from '@/components/Inputs/TextInput';
import SlightFlip from '@/components/magicui/flip-text';
import Particles from '@/components/magicui/particles';
import ShineBorder from '@/components/magicui/shine-border';
import { useProfile } from '@/storys/loginValue';
import { useState, useEffect } from 'react';

const Profile = () => {
  const { firstName, setFirstName, lastName, setLastName, phoneNumber, setPhoneNumber } = useProfile();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Phone Number:', phoneNumber);
  }, [firstName, lastName, phoneNumber]);

  const handleInputChange = () => {
    const isPhoneNumberValid = phoneNumber.trim().length === 11;
    const isValid =
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      isPhoneNumberValid;
    setIsFormValid(isValid);
  };

  const handleSave = () => {
    if (isFormValid) {
      console.log('Saved First Name:', firstName);
      console.log('Saved Last Name:', lastName);
      console.log('Saved Phone Number:', phoneNumber);
    }
  };

  return (
    <div className="min-h-auto flex items-center justify-center bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Right side - Profile Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg md:col-start-1 md:col-end-2">
            <div className="flex flex-col items-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-purple-600 mb-4"
              />
              <h2 className="text-white text-xl md:text-2xl font-bold">Mike Andrew</h2>
              <p className="text-purple-400">Ceo/Co-Founder</p>
              <p className="text-gray-400 text-center mt-4 text-sm md:text-base">
                Do not be scared of the truth because we need to restart the human foundation in truth. And I love you like Kanye loves Kanye.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-google"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Left side - Edit Profile Form */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg md:col-start-2 md:col-end-3">
            {/* Banner for Front End */}
            <div className="relative mb-6 flex items-center justify-center">
              <ShineBorder color={'#16423C'} borderWidth={1.5} duration={10} className="bg-[#fff] h-40 w-full flex items-center justify-center rounded-lg shadow-lg overflow-hidden">
                <Particles className="absolute inset-0" quantity={100} ease={80} color={'#16423C'} refresh />
                <div className="relative z-10 text-center">
                  <SlightFlip word="Guruhingiz:" className="text-3xl md:text-4xl font-bold text-black" />
                  <p className="text-black mt-2 font-semibold">Darslarni hoziroq boshlang</p>
                </div>
              </ShineBorder>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">First Name</label>
                  <TextInput
                    type="text"
                    placeholder="Enter First Name"
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      handleInputChange();
                    }}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Last Name</label>
                  <TextInput
                    type="text"
                    placeholder="Enter Last Name"
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      handleInputChange();
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Phone Number</label>
                <PhoneInput
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e);
                    handleInputChange();
                  }}
                />
              </div>
              <button
                type="button"
                className={`w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isFormValid}
                onClick={handleSave}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
