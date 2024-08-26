import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import PageTitle from './components/Header/PageTitle'
import Index from './pages'

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
      </Routes>
    </DefaultLayout>
  )
}

export default App
