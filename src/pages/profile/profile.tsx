import PhoneInput from '@/components/Inputs/PhoneInput';
import TextInput from '@/components/Inputs/TextInput';
import SlightFlip from '@/components/magicui/flip-text';
import Particles from '@/components/magicui/particles';
import ShineBorder from '@/components/magicui/shine-border';
import { useProfile } from '@/storys/loginValue';
import { useEffect, useState } from 'react';
import defaultLogo from '@/assets/images/user.jpg';
import ShinyButton from '@/components/magicui/shiny-button';
import FileUpload from '@/components/Inputs/fileUpolatInput';
import { checkImgUpload } from '@/context/logic/global_functions/fileUpolatOptions';
import { useGet } from '@/context/logic/global_functions/useGetOption';
import { get_Mee } from '@/context/api/url';
import { config } from '@/context/api/token';

const Profile = () => {
  const { firstName, setFirstName, lastName, setLastName, phoneNumber, setPhoneNumber } = useProfile();
  const [isFormValid, setIsFormValid] = useState(false);
  const [saveImg, setSaveImg] = useState(0);
  const [uploadedImg, setUploadedImg] = useState<string | null>(null); // State to store uploaded image URL
  const { data, getData } = useGet(get_Mee, config);
  useEffect(() => {
    getData();
  }, []);
  const handleInputChange = () => {
    const isPhoneNumberValid = phoneNumber.trim().length === 11;
    const isValid =
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      isPhoneNumberValid;
    setIsFormValid(isValid);
  };
  const handleFileChange = async (file: File) => {
    let imgID = await checkImgUpload(file);
    setSaveImg(imgID);

    // Create a URL for the uploaded file and save it in state
    const imageUrl = URL.createObjectURL(file);
    setUploadedImg(imageUrl);
  };

  const handleSave = () => {
    if (isFormValid) {
      console.log('Saved First Name:', firstName);
      console.log('Saved Last Name:', lastName);
      console.log('Saved Phone Number:', phoneNumber);
      console.log('Uploaded Image ID:', saveImg);
    }
  };

  return (
    <div className="min-h-auto flex items-center justify-center bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Right side - Profile Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg md:col-start-1 md:col-end-2 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <img
                src={uploadedImg || defaultLogo}
                alt="Profile"
                className="w-48 h-48 rounded-full border-4 border-[#16423C] mb-4"
              />
              <h1 className="text-2xl font-semibold">{data?.firstName} {data?.lastName}</h1>
              <h2 className="text-lg">+{data?.phoneNumber}</h2>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm mb-2">Profil rasmini yuklang</label>
                <FileUpload onFileChange={handleFileChange} />
              </div>
            </div>
          </div>

          {/* Left side - Edit Profile Form */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg md:col-start-2 md:col-end-3">
            {/* Banner for Front End */}
            <div className="relativeflex mb-2 items-center justify-center">
              <ShineBorder color={'#16423C'} borderWidth={1.5} duration={10} className="bg-[#fff] h-40 w-full flex items-center justify-center rounded-lg shadow-lg overflow-hidden mb-7">
                <Particles className="absolute inset-0" quantity={100} ease={80} color={'#16423C'} refresh />
                <div className="relative z-10 text-center">
                  <SlightFlip word="Guruhingiz:Front end" className="text-3xl md:text-2xl font-bold text-black" />
                  <p className="text-black mt-2 font-semibold">Darslarni hoziroq boshlang</p>
                </div>
              </ShineBorder>
              <p className='text-black font-semibold text-2xl'>Edit</p>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">First Name</label>
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
                  <label className="block text-gray-300 text-sm font-semibold mb-2">Last Name</label>
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
              <ShinyButton
                text="Save"
                className={`w-full bg-[#063d36] border-none  ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isFormValid}
                onClick={handleSave}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
