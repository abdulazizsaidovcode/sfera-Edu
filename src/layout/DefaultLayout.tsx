import React, { useState, ReactNode, useEffect } from 'react';
import Header from '../components/custom/Header/index';
import Sidebar from '../components/custom/Sidebar/index';
import { useLocation } from 'react-router-dom';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isvisibleSidebar, setIsvisibleSidebar] = useState(false);
  const { pathname } = useLocation();
  const role = localStorage.getItem('ROLE');

  useEffect(() => {
    let check = !(pathname.startsWith('/login') || (pathname.startsWith('/home')) || role === 'ROLE_ADMIN' || pathname.startsWith('/register') || pathname.startsWith('/client/quiz/'))
    setIsvisibleSidebar(check)
  }, [pathname, role])

  return (
    <div className="bg-[#fff] text-black">
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
    </div>
  );
};

export default DefaultLayout;
