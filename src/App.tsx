import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import PageTitle from './components/custom/Header/PageTitle'
import Index from './pages'
import Login from './pages/auth/login'
import Home from './pages/home/home'
import Course from './pages/course/course'
import Dashboard from './pages/Dashboard/dashboard'

function App() {

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
          path={`/login`}
          element={
            <>
              <PageTitle title="Login" />
              <Login />
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
      </Routes>
    </DefaultLayout>
  )
}

export default App
