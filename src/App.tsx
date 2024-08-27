import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import PageTitle from './components/custom/Header/PageTitle'
import Index from './pages'
import Login from './pages/auth/login'
import Home from './pages/home/home'

function App() {

  return (
    <DefaultLayout>
      <Routes>
        <Route
          index
          path={`/`}
          element={
            <>
              <PageTitle title="Admin | Dashboard" />
              <Index />
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
              <PageTitle title="Login" />
              <Home />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  )
}

export default App
