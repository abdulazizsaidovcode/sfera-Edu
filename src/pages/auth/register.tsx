import React, { useRef, useState } from 'react';
import DotPattern from '@/components/magicui/dot-pattern';
import ShinyButton from '@/components/magicui/shiny-button';
import TextInput from '@/components/Input/TextInput';
import { useFormValue } from '@/storys/loginValue';

function Register() {
    const { phoneNumber, firstName, lastName, password, checkPassword, setFirstName, setLastName, setPhoneNumber, setPassword, setCheckPassword } = useFormValue();
    
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const checkPasswordRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = () => {
        const enteredPassword = passwordRef.current?.value || '';
        const enteredCheckPassword = checkPasswordRef.current?.value || '';

        if (enteredPassword !== enteredCheckPassword) {
            setError('Parol va tasdiqlash paroli mos kelmayapti.');
            return;
        }

        // Agar parollar mos kelsa, xatoni tozalash va boshqa amallarni bajarish
        setError(null);
        console.log("First Name:", firstNameRef.current?.value);
        console.log("Last Name:", lastNameRef.current?.value);
        console.log("Phone Number:", phoneNumberRef.current?.value);
        console.log("Password:", enteredPassword);
    };

    return (
        <>
            <DotPattern />
            <section className="bg-gray-50 flex justify-center items-center z-20 relative">
                <div className="flex flex-col items-center justify-center sm:px-6 py-8 mx-auto h-screen lg:py-0 xl:w-1/3 lg:w-[40%] md:w-1/2 sm:w-[70%] xsm:w-[70%] w-full">
                    <div className="w-full backdrop-blur-sm rounded-2xl border border-[#087E43] dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-2 space-y-4 md:space-y-6 sm:p-8 relative z-999">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign up 
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <p className="block mb-2 text-sm font-medium text-gray-900">Firstname:</p>
                                    <TextInput 
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)} 
                                        placeholder='firstname' 
                                        ref={firstNameRef}
                                    />
                                </div>
                                <div>
                                    <p className="block mb-2 text-sm font-medium text-gray-900">Lastname:</p>
                                    <TextInput 
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)} 
                                        placeholder='lastname' 
                                        ref={lastNameRef}
                                    />
                                </div>
                                <div>
                                    <p className="block mb-2 text-sm font-medium text-gray-900">Phonenumber:</p>
                                    <TextInput 
                                        value={phoneNumber} 
                                        onChange={(e) => setPhoneNumber(e.target.value)} 
                                        placeholder='phonenumber' 
                                        ref={phoneNumberRef}
                                        type='number'
                                    />
                                </div>
                                <div className='mb-5'>
                                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</p>
                                    <TextInput 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        placeholder='••••••••' 
                                        type='password'
                                        ref={passwordRef}
                                    />
                                </div>
                                <div className='mb-5'>
                                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Check password</p>
                                    <TextInput 
                                        value={checkPassword} 
                                        onChange={(e) => setCheckPassword(e.target.value)} 
                                        placeholder='••••••••' 
                                        type='password'
                                        ref={checkPasswordRef}
                                    />
                                </div>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <ShinyButton text='Register' className='bg-[#087E43] w-full' onClick={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;
