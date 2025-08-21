import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './context/AppContext.jsx'
import { ToastContainer } from 'react-toastify'

// 👇 import our global ImageZoomProvider
import { ImageZoomProvider } from './hooks/useImageZoom.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Wrap everything at the highest level */}
      <ImageZoomProvider>
        <AppProvider>
          <App />
          <ToastContainer />
        </AppProvider>
      </ImageZoomProvider>
    </BrowserRouter>
  </StrictMode>,
)
