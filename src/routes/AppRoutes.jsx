import Login from "@/pages/Login";
import { Routes,Route } from "react-router-dom";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Navbar from "@/components/Navbar";
import AdminDashboard from "@/pages/AdminDashboard";
import ProductDetails from "@/pages/ProductDetails";

function AppRoutes({setUser}){
    return (



        <Routes>
            <Route path="/product/details" element={<ProductDetails/>}/>
            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login setUser={setUser}/>}/>
            <Route path="/register" element={<Register/>}/>

        </Routes>
    )
}
export default AppRoutes