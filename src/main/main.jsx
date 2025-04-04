import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../css/variables.css'
import './index.css'
import App from './App.jsx'
import '../css/login.css'
import '../css/components.css'
import '../css/alert.css'
import '../css/loader.css'
import '../css/navbar.css'
import '../css/pazienti.css'
import '../css/dashboard.css'
import '../css/appuntamenti.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
