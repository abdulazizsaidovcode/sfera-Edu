import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import PageTitle from './components/custom/Header/PageTitle'
import Index from './pages'
import Login from './pages/auth/login'
import Home from './pages/home/home'
import Course from './pages/student/course/course'
import Dashboard from './pages/student/Dashboard/dashboard'
import Register from './pages/auth/register'
import { useEffect } from 'react'
import { setConfig } from './context/api/token'
import Notification from './pages/notification/notification'
import Profile from './pages/profile/profile'

function App() {
  const tokens = localStorage.getItem('token');
  const role = localStorage.getItem('ROLE');
  const tokenExpiry = localStorage.getItem('tokenExpiry');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setConfig();
    const refresh = sessionStorage.getItem('refreshes');

    if (!tokens) {
      sessionStorage.removeItem('refreshes');
      if (!pathname.startsWith('/auth')) navigate('/auth/login');
    } else if (!refresh) sessionStorage.setItem('refreshes', 'true');
  }, [tokens, pathname, navigate]);

  useEffect(() => {
    setConfig();
    window.scrollTo(0, 0);

    if (pathname === '/') {
      if (role === 'ROLE_STUDENT') {
        if (!tokens) navigate('/auth/login');
        else navigate('/dashboard');
      } else if (role === 'ROLE_TEACHER') {
        if (!tokens) navigate('/auth/login');
        // kamchiolik bor qilish kk
        else navigate('/dashboard');
      }
    }

    if (tokens && tokenExpiry) {
      const now = new Date().getTime();
      if (now > parseInt(tokenExpiry)) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('ROLE');
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      localStorage.removeItem('ROLE');
    }

    if (!tokens && !pathname.startsWith('/auth')) navigate('/auth/login');
    if (!tokens && pathname.startsWith('/auth')) sessionStorage.removeItem('refreshes');
  }, [pathname, tokens, navigate]);

  return (
    <DefaultLayout>
      <Routes>
        <Route
          index
          path={`/dashboard`}
          element={
            <>
              <PageTitle title="Admin | Dashboard" />
              <Dashboard />
            </>
          }
        />
        <Route
          index
          path={`/auth/login`}
          element={
            <>
              <PageTitle title="Login" />
              <Login />
            </>
          }
        />
        <Route
          index
          path={`/auth/register`}
          element={
            <>
              <PageTitle title="Register" />
              <Register />
            </>
          }
        />
        <Route
          index
          path={`/home`}
          element={
            <>
              <PageTitle title="Home" />
              <Home />
            </>
          }
        />
        <Route
          index
          path={`/course`}
          element={
            <>
              <PageTitle title="Course" />
              <Course />
            </>
          }
        />
        <Route
          index
          path={`/profile`}
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
        <Route
          index
          path={`/notification`}
          element={
            <>
              <PageTitle title="Notification" />
              <Notification />
            </>
          }
        />
        {/* <Route 
        index
        path="/lessons/:lessonId"
         element={
          <>
          <PageTitle title='Lesson'/>
          <LessonVideo />
          </>
          } 
         /> */}
      </Routes>
    </DefaultLayout>
  )
}

export default App
