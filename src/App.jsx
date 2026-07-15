import { useState } from 'react'
// import App from "@/App";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/Footer'

function App() {
    const [user, setUser] = useState(null)
    
  return (

    <>
    <Navbar user={user} setUser={setUser} />
    <AppRoutes setUser={setUser}/>
    <Footer/>
    </>
  )
}

export default App
