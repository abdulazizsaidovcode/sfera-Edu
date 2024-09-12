import PasswordInput from '@/components/Inputs/passwordInput';
import PhoneInput from '@/components/Inputs/PhoneInput';
import DotPattern from '@/components/magicui/dot-pattern';
import ShinyButton from '@/components/magicui/shiny-button';
import { login_URl } from '@/context/api/url';
import { usePost } from '@/context/logic/global_functions/usePostOption';
import { useFormValue } from '@/storys/loginValue';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const { phoneNumber, password, setPhoneNumber, setPassword, } = useFormValue();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const passwordRef = useRef<HTMLInputElement>(null);
    const { error, loading, postData, response } = usePost(login_URl, {
        phoneNumber: phoneNumber || '',
        password: passwordRef.current?.value || '',
    });
    console.log('---------------------', response, '-----------------------');

    useEffect(() => {
        if (response) {
            const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
            localStorage.setItem('token', response?.token);
            localStorage.setItem('ROLE', response?.role);
            localStorage.setItem('tokenExpiry', expiryTime.toString());
            navigate("/dashboard");
        }
    }, [response?.role, response?.token]);

    const handleSubmit = async () => {
        if (phoneNumber.length > 11 && passwordRef.current?.value) {
            setIsSubmitting(true);
            try {
                await postData();
                navigate('/dashboard', { replace: true });
                toast.success('Muvaffaqiyatli kirdingiz!');
                setPhoneNumber('');
                setPassword('');
            } catch (err) {
                console.log('Xatolik yuz berdi:', error);
                ('Login amalga oshmadi!');
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
                handleSubmit();  // Enter bosilganda formani yuborish
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [phoneNumber, password]);

    return (
        <>
            <DotPattern />
            <section className="bg-gray-50 flex justify-center items-center z-20 relative">
                <div className="flex flex-col items-center justify-center sm:px-6 py-8 mx-auto h-screen lg:py-0 xl:w-1/3 lg:w-[40%] md:w-1/2 sm:w-[70%] xsm:w-[70%] w-full">
                    <div className="w-full backdrop-blur-sm rounded-2xl border border-[#087E43] dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-2 space-y-4 md:space-y-6 sm:p-8 relative z-999">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign in to your account
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <p className="block mb-2 text-sm font-medium text-gray-900">Your name</p>
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
                                <ShinyButton disabled={isSubmitting} text='login' className='bg-[#087E43] w-full' onClick={handleSubmit} />
                                <div className='flex justify-between'>
                                    <p className="text-sm font-medium text-primary-600 ">Do you need a new account?</p>
                                    <Link to="/auth/register" className="text-sm font-medium text-[#087E43] hover:underline hover:text-[#087E43]">Sign up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
