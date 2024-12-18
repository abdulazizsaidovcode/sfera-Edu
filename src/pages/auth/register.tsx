import { useEffect, useRef, useState } from 'react';
import DotPattern from '@/components/magicui/dot-pattern';
import ShinyButton from '@/components/magicui/shiny-button';
import TextInput from '@/components/Inputs/TextInput';
import { useFormValue } from '@/storys/loginValue';
import { usePost } from '@/context/logic/global_functions/usePostOption';
import { register_URl } from '@/context/api/url';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PhoneInput from '@/components/Inputs/PhoneInput';
import LoadingModal from '@/components/Loading/loading';
import PasswordInput from '@/components/Inputs/passwordInput';

function Register() {
    const { phoneNumber, firstName, lastName, password, checkPassword, setFirstName, setLastName, setPhoneNumber, setPassword, setCheckPassword } = useFormValue();
    const [errorInput, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const checkPasswordRef = useRef<HTMLInputElement>(null);
    const { error, loading, postData, } = usePost(
        register_URl, // URL
        {
            firstName: firstNameRef.current?.value || '', // Getting value from useRef
            lastName: lastNameRef.current?.value || '',
            phoneNumber: phoneNumber || '',
            password: passwordRef.current?.value || '',
        }
    );
    const handleSubmit = async () => {
        const enteredPassword = passwordRef.current?.value || '';
        const enteredCheckPassword = checkPasswordRef.current?.value || '';

        if (enteredPassword !== enteredCheckPassword) {
            setError('Parol va tasdiqlash paroli mos kelmayapti.');
            return;
        }

        setError(null);
        if (phoneNumber.length > 11 && firstNameRef.current?.value && lastNameRef.current?.value && passwordRef.current?.value) {
            setIsSubmitting(true);
            try {
                
                await postData();
                navigate('/auth/login', { replace: true });
                toast.success('Ro\'yxatdan o\'tdingiz!');
                setPhoneNumber('');
                setPassword('');
            } catch (err) {
                console.log('Xatolik yuz berdi:', error);
                toast.error('Ro\'yxatdan o\'tishda xatolik yuz berdi.');
            } finally {
                setIsSubmitting(false);
            }
        } else {
            toast.error('Formani to\'ldiring!');
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleSubmit(); 
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [phoneNumber, password, firstName, lastName]);

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
                                    <PhoneInput
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e)}
                                        placeholder='phonenumber'
                                    />
                                </div>
                                <div className='mb-5'>
                                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</p>
                                    <PasswordInput
                                        ref={passwordRef}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        type='password'
                                    />
                                </div>
                                <div className='mb-5'>
                                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Check password</p>
                                    <PasswordInput
                                        ref={checkPasswordRef}
                                        value={checkPassword}
                                        onChange={(e) => setCheckPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        type='password'
                                    />
                                </div>
                                {errorInput && <p className="text-red-500 text-sm">{errorInput}</p>}
                                <ShinyButton
                                    text='Register'
                                    className='bg-[#087E43] w-full'
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <LoadingModal isVisible={isSubmitting} /> 
        </>
    );
}

export default Register;
