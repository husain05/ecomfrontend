// import App from "@/App";

import './App.css'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/Footer'

import { useEffect, useState } from "react";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
   
      <Navbar user={user} setUser={setUser} />
      <AppRoutes setUser={setUser} />
      <Footer />

    </>
  );
}

export default App
