import React, { useState, ReactNode } from 'react';
import Header from '../components/custom/Header/index';
import Sidebar from '../components/custom/Sidebar/index';
import { useLocation } from 'react-router-dom';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { pathname } = useLocation();
  const role = localStorage.getItem('ROLE');

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark bg-stroke text-black">
      <div className="flex h-screen overflow-hidden">
        {!(pathname.startsWith('/login') || role === 'ROLE_ADMIN' || pathname.startsWith('/register') || pathname.startsWith('/client/quiz/')) && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
        )}

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {!(pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/client/quiz/')) && (
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          )}

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
