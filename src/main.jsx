import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import CartProvider from './context/CartProvider'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <CartProvider>
    <App />
    </CartProvider>
    <Toaster position="top-center" />
    </BrowserRouter>

) 