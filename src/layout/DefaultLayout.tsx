import React, { useState, ReactNode, useEffect } from 'react';
import Header from '../components/custom/Header/index';
import Sidebar from '../components/custom/Sidebar/index';
import { useLocation } from 'react-router-dom';
import ShineBorder from '@/components/magicui/shine-border';
import ShinyButton from '@/components/magicui/shiny-button';
import DotPattern from '@/components/magicui/dot-pattern';
import { useGet } from '@/context/logic/global_functions/useGetOption';
import { get_Mee } from '@/context/api/url';
import { config } from '@/context/api/token';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isvisibleSidebar, setIsvisibleSidebar] = useState(false);
  const { pathname } = useLocation();
  const role = sessionStorage.getItem('ROLE');
  const token = sessionStorage.getItem('token');
  const getMee = useGet(get_Mee, config);

  useEffect(() => {
    const checkSidebarVisibility = !(pathname.startsWith('/auth') || pathname.startsWith('/home') || role === 'ROLE_ADMIN' || pathname.startsWith('/register') || pathname.startsWith('/client/quiz/'));
    setIsvisibleSidebar(checkSidebarVisibility);
  }, [pathname, role]);

  useEffect(() => {
    if (role && token) {
      getMee.getData();
    }
  }, [role, token]);

  useEffect(() => {
    if (getMee.data?.role === 'ROLE_STUDENT') {
      sessionStorage.setItem('ROLE', getMee.data.role);
      console.log('Role updated to ROLE_STUDENT');
    }
  }, [getMee.data, role]);

  return (
    <div className="bg-[#fff] text-black">
      {role === 'ROLE_USER' ? (
        <>
          <DotPattern />
          <div className="flex justify-center items-center h-screen">
            <ShineBorder color={'#1c8340'} borderWidth={1.5} className="p-10 bg-white shadow-lg rounded-lg max-w-xl text-center">
              <h1 className="text-4xl font-bold text-[#1c8340] mb-4">Tasdiqlash Talab Qilinadi</h1>
              <p className="text-lg text-gray-700 mb-6">
                Iltimos, admin bilan bog'laning yoki biroz kuting. Sizning rolingiz hali tasdiqlanmagan.
              </p>
              <div className="flex justify-center items-center">
                <a href="https://t.me/ITCityAcademy">
                  <ShinyButton text="Adminga Murojaat Qiling" className="bg-[#1c8340] border-none text-white px-6 py-3 rounded-full " />
                </a>
              </div>
            </ShineBorder>
          </div>
        </>
      ) : (
        <>
          <div className="flex h-screen overflow-hidden">
            {isvisibleSidebar && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {isvisibleSidebar && <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DefaultLayout;
