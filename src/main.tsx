import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queriyClient=new QueryClient()
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queriyClient} >
    <Router>
      <App />
    </Router>
  </QueryClientProvider>
)
