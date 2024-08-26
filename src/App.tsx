import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import PageTitle from './components/Header/PageTitle'
import Index from './pages'
import Login from './pages/auth/login'

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
      </Routes>
    </DefaultLayout>
  )
}

export default App
