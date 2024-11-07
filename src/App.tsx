import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import PageTitle from './components/custom/Header/PageTitle'
import Login from './pages/auth/login'
import Home from './pages/home/home'
import Course from './pages/student/course/course'
import Dashboard from './pages/student/Dashboard/dashboard'
import Register from './pages/auth/register'
import { useEffect, useState } from 'react'
import { setConfig } from './context/api/token'
import Notification from './pages/notification/notification'
import Profile from './pages/profile/profile'
import DashboardTeacher from './pages/teacher/dashboard/dashboard'
import Students from './pages/teacher/students/students'
import Lessons from './pages/teacher/lessons/lessons'
import Confirmeted from './confirmeted'
import Completed_tasks from './pages/teacher/Completed task/completed_tasks'
import TaskSection from './pages/teacher/taskSection/taskSection'
import Graded from './pages/teacher/Gradet/gradet'
import GroupAttendance from './pages/teacher/davomat/Davomat'
import StudentDavomat from './pages/student/studentRow/Davomat'


function App() {
  const tokens = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('ROLE');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [pageTitle, setPageTitle] = useState("");

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
        else navigate('/teacher/Dashboard');
      } 
    }
    if (!tokens && !pathname.startsWith('/auth')) navigate('/auth/login');
    if (!tokens && pathname.startsWith('/auth')) sessionStorage.removeItem('refreshes');
  }, [pathname, tokens, navigate, role]);

  useEffect(() => {
    if (role === 'ROLE_TEACHER') {
      setPageTitle('Teacher | Dashboard');
    } else if (role === 'ROLE_STUDENT') {
      setPageTitle('Student | Dashboard');
    } 
  }, [role]);

  return (
    <DefaultLayout>
      <Routes>
        <Route
          index
          path={`/dashboard`}
          element={
            <>
              <PageTitle title={pageTitle} />
              <Dashboard />
            </>
          }
        />
        <Route
          index
          path={`/teacher/Dashboard`}
          element={
            <>
              <PageTitle title={pageTitle} />
              <DashboardTeacher />
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
          path={`/student`}
          element={
            <>
              <PageTitle title="Teacher | Student" />
              <Students />
            </>
          }
        />
        <Route
          index
          path={`/lesson`}
          element={
            <>
              <PageTitle title="Teacher | Lesson" />
              <Lessons />
            </>
          }
        />
        <Route
          index
          path={`/notifications`}
          element={
            <>
              <PageTitle title="Teacher | Notification" />
              <Notification />
            </>
          }
        />
        <Route
          index
          path={`/taskdone`}
          element={
            <>
              <PageTitle title="Teacher | Taskdone" />
              <Notification />
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
        <Route
          index
          path={`/confirm`}
          element={
            <>
              <PageTitle title="Confirem" />
              <Confirmeted />
            </>
          }
        />
        <Route
          index
          path={`/completed`}
          element={
            <>
              <PageTitle title="Completed tasks" />
              <Completed_tasks />
            </>
          }
        />
        <Route
          index
          path={`/task`}
          element={
            <>
              <PageTitle title="TaskSection" />
              <TaskSection/>
            </>
          }
        />
        <Route
          index
          path={`/graded`}
          element={
            <>
              <PageTitle title="TaskSection" />
              <Graded/>
            </>
          }
        />
        <Route
          index
          path={`/davomat`}
          element={
            <>
              <PageTitle title="Davomat" />
              <GroupAttendance/>
            </>
          }
        />
        <Route
          index
          path={`/student/davomat`}
          element={
            <>
              <PageTitle title="TaskSection" />
              <StudentDavomat/>
            </>
          }
        />

      </Routes>
    </DefaultLayout>
  );
}

export default App;
