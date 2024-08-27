import DotPattern from '@/components/magicui/dot-pattern'
import Ripple from '@/components/magicui/ripple'
import ShinyButton from '@/components/magicui/shiny-button'

function Login() {

    return (
        <>
            <DotPattern />
            <Ripple mainCircleSize={400} />
            <section className="bg-gray-50 dark:bg-gray-900 flex justify-center items-center z-20 relative">
                <div className="flex flex-col items-center justify-center sm:px-6 py-8 mx-auto h-screen  lg:py-0 xl:w-1/3 lg:w-[40%] md:w-1/2 sm:w-[70%] xsm:w-[70%] w-full  ">
                    <div className="w-full backdrop-blur-sm rounded-2xl  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-2 space-y-4 md:space-y-6 sm:p-8 relative z-999 " >
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</p>
                                    <input type="email" id="email" className="login__input bg-white border border-blue-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name" />
                                </div>
                                <div className='mb-5'>
                                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</p>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="login__input bg-white border border-blue-500 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " />
                                </div>
                                <ShinyButton text='login' className=' bg-current w-full' />
                                <div className='flex justify-between'>
                                    <p className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</p>
                                    <p className="text-sm font-medium text-blue-600 hover:underline dark:text-primary-500">Sign up</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Login
