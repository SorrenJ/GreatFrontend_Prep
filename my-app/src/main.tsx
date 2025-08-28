import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import App from './App.tsx'
import Counter from './Counter/counter.tsx'  
import ContactForm from './Contact_Form/contactform.tsx'  
import UseCounterPage from './useCounter/UseCounterPage.tsx' 
import ProgressBar from './Progress_Bars/progress_bars.tsx' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/contactform" element={<ContactForm />} />
        <Route path="/usecounterpage" element={<UseCounterPage />} />
        <Route path="/progressbars" element={<ProgressBar />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
