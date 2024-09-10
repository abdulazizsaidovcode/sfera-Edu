import DotPattern from '@/components/magicui/dot-pattern';
import Ripple from '@/components/magicui/ripple';
import { Link } from 'react-router-dom';
import ShinyButton from '@/components/magicui/shiny-button';
import TextInput from '@/components/Input/TextInput';

function Register() {
    return (
        <>
            <DotPattern />
            {/* <Ripple mainCircleSize={400} /> */}
            <section className="bg-gray-50 flex justify-center items-center z-20 relative">
                <div className="flex flex-col items-center justify-center sm:px-6 py-8 mx-auto h-screen  lg:py-0 xl:w-1/3 lg:w-[40%] md:w-1/2 sm:w-[70%] xsm:w-[70%] w-full">
                    <div className="w-full backdrop-blur-sm rounded-2xl border border-[#087E43] dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-2 space-y-4 md:space-y-6 sm:p-8 relative z-999">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign up 
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <p className="block mb-2 text-sm font-medium text-gray-900">Firstname:</p>
                                    <TextInput placeholder='firstname' />
                                </div>
                                <div>
                                    <p className="block mb-2 text-sm font-medium text-gray-900">Lastname:</p>
                                    <TextInput placeholder='lastname' />
                                </div>
                                <div>
                                    <p className="block mb-2 text-sm font-medium text-gray-900">Phonenumber:</p>
                                    <TextInput placeholder='phonenumber' />
                                </div>
                                <div className='mb-5'>
                                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</p>
                                    <TextInput placeholder='••••••••' />
                                </div>
                                <ShinyButton text='login' className='bg-[#087E43] w-full' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;
