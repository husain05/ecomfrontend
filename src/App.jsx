import { useState } from 'react'
// import App from "@/App";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'

function App() {
    const [user, setUser] = useState(null)
  return (

    <>
    <Navbar user={user} setUser={setUser} />
    <AppRoutes setUser={setUser}/>
    </>
  )
}

export default App
