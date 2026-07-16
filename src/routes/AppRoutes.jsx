import Login from "@/pages/Login";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import AdminDashboard from "@/pages/AdminDashboard";
import Products from "@/pages/Products"
import CreateProduct from "@/pages/CreateProduct";
import SingleProduct from "@/pages/SingleProduct";
import EditProduct from "@/pages/EditProduct";
import Categories from "@/pages/Categories";
import CreateCategory from "@/pages/CreateCategory";
import EditCategory from "@/pages/EditCategory";
import Cart from "@/pages/Cart";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";
import UnauthorizedRoute from "@/components/UnauthorizedRoute";
import NotFound from "@/pages/NotFound";
function AppRoutes({ setUser,cart,setCart,updateQuantity, removeProduct,clearCart} ) {
    return (
        <Routes>
            <Route path="/cart" element={<ProtectedRoute><Cart cart={cart} setCart={setCart} updateQuantity={updateQuantity} removeProduct={removeProduct} clearCart={clearCart}/></ProtectedRoute>}/>
            <Route path="/edit-category/:id" element={<ProtectedRoute adminOnly={true}><EditCategory /></ProtectedRoute>}/>
            <Route path="/create-category" element={<ProtectedRoute adminOnly={true}><CreateCategory /></ProtectedRoute>}/>
            <Route path="/categories" element={<ProtectedRoute adminOnly={true}><Categories /></ProtectedRoute>}/>
            <Route path="/product/:id" element={<ProtectedRoute><SingleProduct /></ProtectedRoute>} />
            <Route path="/create-product" element={<ProtectedRoute adminOnly={true}><CreateProduct /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute ><Products /></ProtectedRoute>}/>
            <Route path="/edit-product/:productId" element={<ProtectedRoute adminOnly={true}><EditProduct/></ProtectedRoute>} />
           
            <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login setUser={setUser}/></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register/></PublicRoute>} />
            <Route path="/unauthorizedAccess" element={<UnauthorizedRoute/>} />
            <Route path="*" element={<NotFound/>} />


        </Routes>
    )
}
export default AppRoutes