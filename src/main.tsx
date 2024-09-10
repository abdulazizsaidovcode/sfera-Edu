import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "react-hot-toast";

const queriyClient=new QueryClient()
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queriyClient} >
    <Router>
      <App />
    </Router>
    <Toaster position="top-center" reverseOrder={false} />
  </QueryClientProvider>
)
