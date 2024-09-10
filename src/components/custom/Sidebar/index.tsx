import { useEffect, useRef } from 'react';
import { LuLayoutDashboard } from 'react-icons/lu';
import { NavLink, useLocation } from 'react-router-dom';
import { PiStudentFill } from 'react-icons/pi';
import { IoIosLogOut } from 'react-icons/io';
import ShinyButton from '@/components/magicui/shiny-button';
import logo from '@/assets/images/Sfer 1.png'

interface SidebarProps {
  sidebarOpen: boolean;
  isOpenModal: boolean;
  setSidebarOpen: (arg: boolean) => void;
  setIsOpenModal: (arg: boolean) => void;
}

const   MenuItem = ({ title, to, pathname, icon }: { pathname: any, icon: any, title: string, to: string }) => {
  return (
    <NavLink className={'text-black bg-[#6A9C89] '} to={to}>
      <div className={`py-3 px-4 my-3 ${pathname === to ? 'bg-[#20CC6D] group relative shadow flex items-center gap-2.5  font-medium text-black duration-300 ease-in-out cursor-pointer border-none  dark:border-graydark  rounded-lg' : "bg-white hover:opacity-70 group relative shadow flex items-center gap-2.5 font-medium text-black duration-300 ease-in-out hover:bg-[#DAFBED]  cursor-pointer border-stroke  p-3 rounded-lg"}`}>
        {icon}
        {title}
      </div>
    </NavLink>
  )
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, isOpenModal, setIsOpenModal }: SidebarProps) => {
  const location = useLocation();
  const role = localStorage.getItem('ROLE');

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const toggleModal = () => setIsOpenModal(!isOpenModal);

  console.log('MODAL', isOpenModal);


  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#C4DAD2] shadow-4 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex justify-start items-center gap-2 px-6 pb-5.5 lg:pb-6.5">
        <NavLink to="/" className={''}>
          <img src={logo} alt="Sfera" className='w-46 pt-4 flex justify-center items-center' />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">

          {/* <!-- Menu Group --> */}
          <div className='flex flex-col '>
            <ul className="mb-6 flex flex-col">
              {/* <!-- Menu Item Dashboard ADMIN or SUPER_ADMIN --> */}
              <li>

                {/* ADMIN MENUES */}

                {/* <MenuItem
                  title='Dashboard'
                  icon={<LuLayoutDashboard size={20}/>}
                  pathname={location.pathname}
                  to='/'
                />
                <MenuItem
                  title='Category'
                  icon={<MdOutlineCategory  size={20}/>}
                  pathname={location.pathname}
                  to='/'
                />
                <MenuItem
                  title='Group'
                  icon={<MdGroup size={20}/>}
                  pathname={location.pathname}
                  to='/dd'
                />
                <MenuItem
                  title='Teacher'
                  icon={<FaChalkboardTeacher  size={20}/>}
                  pathname={location.pathname}
                  to='/'
                />
                <MenuItem
                  title='Student'
                  icon={<PiStudentFill size={20}/>}
                  pathname={location.pathname}
                  to='/'
                /> */}

                {/* TEACHER MENUES */}

                {/* <MenuItem
                  title='Dashboard'
                  icon={<LuLayoutDashboard size={20} />}
                  pathname={location.pathname}
                  to='/'
                />
                <MenuItem
                  title='Modul'
                  icon={<VscFileSubmodule size={20} />}
                  pathname={location.pathname}
                  to='/'
                />
                <MenuItem
                  title='Lesson'
                  icon={<MdOutlinePlayLesson size={20} />}
                  pathname={location.pathname}
                  to='/'
                />
                <MenuItem
                  title='Student'
                  icon={<PiStudentFill size={20} />}
                  pathname={location.pathname}
                  to='/'
                />
                <MenuItem
                  title='Homework'
                  icon={<RiHomeOfficeLine size={20} />}
                  pathname={location.pathname}
                  to='/'
                /> */}

                {/* TEACHER MENUES */}

                <MenuItem
                  title='Dashboard'
                  icon={<LuLayoutDashboard size={20} />}
                  pathname={location.pathname}
                  to='/dashboard'
                />
                <MenuItem
                  title='Lesson'
                  icon={<PiStudentFill size={20} />}
                  pathname={location.pathname}
                  to='/course'

                />
              </li>
            </ul>
            <ShinyButton onClick={toggleModal} icon={<IoIosLogOut size={25} />} text='Logout' className='bg-blue-400' />
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}

      </div>
    </aside>
  );
};

export default Sidebar;
