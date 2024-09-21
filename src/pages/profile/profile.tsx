import React, { useState, useEffect } from 'react';
import PhoneInput from '@/components/Inputs/PhoneInput';
import TextInput from '@/components/Inputs/TextInput';
import SlightFlip from '@/components/magicui/flip-text';
import Particles from '@/components/magicui/particles';
import ShineBorder from '@/components/magicui/shine-border';
import { useProfile } from '@/storys/loginValue';
import defaultLogo from '@/assets/images/user.jpg';
import ShinyButton from '@/components/magicui/shiny-button';
import FileUpload from '@/components/Inputs/fileUpolatInput';
import { checkImgUpload } from '@/context/logic/global_functions/fileUpolatOptions';
import { useGet } from '@/context/logic/global_functions/useGetOption';
import { get_file, get_Mee, user_Edit } from '@/context/api/url';
import { config } from '@/context/api/token';
import PasswordInput from '@/components/Inputs/passwordInput';
import { useEdit } from '@/context/logic/global_functions/useEditOption';

const Profile: React.FC = () => {
  const { firstName, setFirstName, lastName, setLastName, phoneNumber, setPhoneNumber, checkPassword, password, setPassword, setCheckPassword } = useProfile();
  const [saveImg, setSaveImg] = useState(0);
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const role = sessionStorage.getItem('ROLE')
  const { data, getData } = useGet(get_Mee, config);

  const { editData, response } = useEdit(`${user_Edit}${saveImg}`, {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    password: password
  }, config)

  const [errors, setErrors] = useState<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    checkPassword: string;
  }>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    checkPassword: '',
  });
  console.log();

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    async function check() {
      if (response) {
        await new Promise((res) => {
          localStorage.setItem("token", response?.token);
          localStorage.setItem("ROLE", response?.role);
          res("salom");
        });
        await getData();
        await window.location.reload()
      }
    }

    check(); // check funktsiyasini chaqirish
  }, [response]);

  const handleFileChange = async (file: File) => {
    await checkImgUpload(file, setSaveImg);
    const imageUrl = URL.createObjectURL(file);
    setUploadedImg(imageUrl);
  };

  const validateField = (field: string, value: string) => {
    let newErrors = { ...errors };
    switch (field) {
      case 'firstName':
        newErrors.firstName = value.trim() ? '' : 'Ism bo\'sh bo\'lmasligi kerak';
        break;
      case 'lastName':
        newErrors.lastName = value.trim() ? '' : 'Familiya bo\'sh bo\'lmasligi kerak';
        break;
      case 'phoneNumber':
        newErrors.phoneNumber = value.length === 12 ? '' : 'Telefon raqam 12 ta belgidan iborat bo\'lishi kerak';
        break;
      case 'password':
        newErrors.password = value.length >= 5 ? '' : 'Parol kamida 5 ta belgidan iborat bo\'lishi kerak';
        break;
      case 'checkPassword':
        newErrors.checkPassword = value === password ? '' : 'Parol mos emas';
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (!firstName.trim()) {
      newErrors.firstName = 'Ism bo\'sh bo\'lmasligi kerak';
      valid = false;
    } else {
      newErrors.firstName = '';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Familiya bo\'sh bo\'lmasligi kerak';
      valid = false;
    } else {
      newErrors.lastName = '';
    }

    if (phoneNumber.length !== 12) {
      newErrors.phoneNumber = 'Telefon raqam 12 ta belgidan iborat bo\'lishi kerak';
      valid = false;
    } else {
      newErrors.phoneNumber = '';
    }

    if (password.length < 5) {
      newErrors.password = 'Parol kamida 5 ta belgidan iborat bo\'lishi kerak';
      valid = false;
    } else {
      newErrors.password = '';
    }

    if (password !== checkPassword) {
      newErrors.checkPassword = 'Parol mos emas';
      valid = false;
    } else {
      newErrors.checkPassword = '';
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = async (event: React.FormEvent) => {
    if (validateForm()) {
      editData();
    }
  };


  return (
    <div className="min-h-auto flex items-center justify-center bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg md:col-start-1 md:col-end-2 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <img
                src={data?.fileId ? `${get_file}${data?.fileId}` : defaultLogo}
                alt="Profile"
                className="w-48 h-48 rounded-full border-4 border-[#16423C] mb-4"
              />
              {role === 'ROLE_TEACHER' ? (
                <>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-semibold text-center">{data?.firstName} {data?.lastName}</h1>
                  <h2 className="text-lg">+{data?.phoneNumber}</h2></>
              )}
              <div className="mb-4 w-full">
                <label className="block text-gray-300 text-sm mb-2">Profil rasmini yuklang</label>
                <FileUpload onFileChange={handleFileChange} />
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg md:col-start-2 md:col-end-3">
            <div className="relative flex mb-2 items-center justify-center">
              {role === 'ROLE_TEACHER' ? (
                <ShineBorder color={'#16423C'} borderWidth={1.5} duration={10} className="shine-border bg-[#fff] h-40 w-full flex items-center justify-center rounded-lg shadow-lg overflow-hidden mb-7">
                  <Particles className="absolute inset-0" quantity={100} ease={80} color={'#16423C'} refresh />
                  <div className="relative z-10 text-center">
                    <h1 className="text-2xl font-semibold text-center">{data?.firstName} {data?.lastName}</h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black mt-2 font-semibold">+{data?.phoneNumber}</p>
                  </div>
                </ShineBorder>
              ) : (
                <ShineBorder color={'#16423C'} borderWidth={1.5} duration={10} className="shine-border bg-[#fff] h-40 w-full flex items-center justify-center rounded-lg shadow-lg overflow-hidden mb-7">
                  <Particles className="absolute inset-0" quantity={100} ease={80} color={'#16423C'} refresh />
                  <div className="relative z-10 text-center">
                    <SlightFlip word={data === undefined ? 'Sizda guruh yo\'q' : (String(data?.groupName))} className="text-2xl md:text-3xl lg:text-4xl font-bold text-black" />
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black mt-2 font-semibold">Guruhingiz</p>
                  </div>
                </ShineBorder>
              )}
            </div>
            <div className="space-y-4">
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
                      validateField('firstName', e.target.value);
                    }}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
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
                      validateField('lastName', e.target.value);
                    }}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">Phone Number</label>
                <PhoneInput
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onChange={(value) => {
                    setPhoneNumber(value);
                    validateField('phoneNumber', value);
                  }}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">Password</label>
                  <PasswordInput
                    placeholder="Password"
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validateField('password', e.target.value);
                    }}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">Confirm Password</label>
                  <PasswordInput
                    placeholder="Confirm password"
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    value={checkPassword}
                    onChange={(e) => {
                      setCheckPassword(e.target.value);
                      validateField('checkPassword', e.target.value);
                    }}
                  />
                  {errors.checkPassword && <p className="text-red-500 text-sm">{errors.checkPassword}</p>}
                </div>
              </div>
              <ShinyButton
                text="Save"
                className="w-full bg-[#063d36] border-none"
                onClick={handleSave}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
